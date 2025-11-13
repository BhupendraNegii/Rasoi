import mysql from 'mysql2/promise';
import 'dotenv/config';

const fixUserTable = async () => {
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'foodDeliveryApp',
    });

    console.log('Connected to database');

    // Check if Users table exists and what columns it has
    const [tables] = await connection.query("SHOW TABLES LIKE 'Users'");
    
    if (tables.length === 0) {
      console.log('Users table does not exist. It will be created by Sequelize sync.');
      await connection.end();
      return;
    }

    // Check current table structure
    const [columns] = await connection.query("SHOW COLUMNS FROM `Users`");
    console.log('Current columns:', columns.map(c => c.Field));

    // Check if user_id column exists
    const hasUserId = columns.some(col => col.Field === 'user_id');
    const hasId = columns.some(col => col.Field === 'id' && col.Key === 'PRI');

    if (!hasUserId) {
      if (hasId) {
        console.log('⚠️  Table has "id" column instead of "user_id". Renaming...');
        
        // Rename id to user_id
        await connection.query(`
          ALTER TABLE \`Users\` 
          CHANGE COLUMN \`id\` \`user_id\` INT NOT NULL AUTO_INCREMENT
        `);
        
        console.log('✅ Successfully renamed "id" to "user_id"');
      } else {
        // No primary key column found, add user_id
        console.log('⚠️  No primary key column found. Adding user_id...');
        
        await connection.query(`
          ALTER TABLE \`Users\` 
          ADD COLUMN \`user_id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST
        `);
        
        console.log('✅ Successfully added "user_id" column');
      }
      // Refresh columns list after adding user_id
      const [refreshedColumns] = await connection.query("SHOW COLUMNS FROM `Users`");
      columns.length = 0;
      columns.push(...refreshedColumns);
    } else {
      console.log('✅ user_id column already exists.');
    }

    // Fix other column names to match the model
    const columnMappings = [
      { old: 'email', new: 'Email' },
      { old: 'password', new: 'Password' },
      { old: 'cartData', new: 'Cart_data' },
    ];

    for (const mapping of columnMappings) {
      const hasOldColumn = columns.some(col => col.Field === mapping.old);
      const hasNewColumn = columns.some(col => col.Field === mapping.new);
      
      if (hasOldColumn && !hasNewColumn) {
        try {
          console.log(`⚠️  Renaming "${mapping.old}" to "${mapping.new}"...`);
          
          // Get column definition
          const oldCol = columns.find(col => col.Field === mapping.old);
          let columnDef = '';
          
          if (mapping.old === 'email') {
            columnDef = `VARCHAR(${oldCol.Type.match(/\d+/)?.[0] || 255}) ${oldCol.Null === 'NO' ? 'NOT NULL' : 'NULL'}`;
          } else if (mapping.old === 'password') {
            columnDef = `VARCHAR(${oldCol.Type.match(/\d+/)?.[0] || 255}) NOT NULL`;
          } else if (mapping.old === 'cartData') {
            columnDef = 'JSON DEFAULT NULL';
          }
          
          if (mapping.new === 'Email' && oldCol.Key === 'UNI') {
            columnDef += ' UNIQUE';
          }
          
          await connection.query(`
            ALTER TABLE \`Users\` 
            CHANGE COLUMN \`${mapping.old}\` \`${mapping.new}\` ${columnDef}
          `);
          
          console.log(`✅ Successfully renamed "${mapping.old}" to "${mapping.new}"`);
          // Refresh columns after rename
          const [refreshed] = await connection.query("SHOW COLUMNS FROM `Users`");
          columns.length = 0;
          columns.push(...refreshed);
        } catch (error) {
          console.log(`⚠️  Could not rename "${mapping.old}": ${error.message}`);
        }
      }
    }

    // Handle name -> user_name: if both exist, migrate data and drop old column
    const hasName = columns.some(col => col.Field === 'name');
    const hasUserName = columns.some(col => col.Field === 'user_name');
    
    if (hasName && hasUserName) {
      try {
        console.log('⚠️  Both "name" and "user_name" exist. Migrating data and removing "name"...');
        // Copy data from name to user_name where user_name is NULL or empty
        await connection.query(`
          UPDATE \`Users\` 
          SET \`user_name\` = \`name\` 
          WHERE \`user_name\` IS NULL OR \`user_name\` = ''
        `);
        // Drop the old name column
        await connection.query(`ALTER TABLE \`Users\` DROP COLUMN \`name\``);
        console.log('✅ Successfully migrated and removed "name" column');
        // Refresh columns
        const [refreshed] = await connection.query("SHOW COLUMNS FROM `Users`");
        columns.length = 0;
        columns.push(...refreshed);
      } catch (error) {
        console.log(`⚠️  Could not migrate name column: ${error.message}`);
      }
    } else if (hasName && !hasUserName) {
      try {
        console.log('⚠️  Renaming "name" to "user_name"...');
        const oldCol = columns.find(col => col.Field === 'name');
        const columnDef = `VARCHAR(${oldCol.Type.match(/\d+/)?.[0] || 255}) ${oldCol.Null === 'NO' ? 'NOT NULL' : 'NULL'}`;
        await connection.query(`
          ALTER TABLE \`Users\` 
          CHANGE COLUMN \`name\` \`user_name\` ${columnDef}
        `);
        console.log('✅ Successfully renamed "name" to "user_name"');
        // Refresh columns
        const [refreshed] = await connection.query("SHOW COLUMNS FROM `Users`");
        columns.length = 0;
        columns.push(...refreshed);
      } catch (error) {
        console.log(`⚠️  Could not rename "name": ${error.message}`);
      }
    }

    // Add Favorite_item column if it doesn't exist
    const hasFavoriteItem = columns.some(col => col.Field === 'Favorite_item' || col.Field === 'favoriteItem');
    if (!hasFavoriteItem) {
      try {
        console.log('⚠️  Adding "Favorite_item" column...');
        await connection.query(`
          ALTER TABLE \`Users\` 
          ADD COLUMN \`Favorite_item\` JSON DEFAULT NULL
        `);
        console.log('✅ Successfully added "Favorite_item" column');
      } catch (error) {
        console.log(`⚠️  Could not add Favorite_item: ${error.message}`);
      }
    }

    // Remove createdAt and updatedAt if they exist (model has timestamps: false)
    const hasCreatedAt = columns.some(col => col.Field === 'createdAt');
    const hasUpdatedAt = columns.some(col => col.Field === 'updatedAt');
    if (hasCreatedAt || hasUpdatedAt) {
      try {
        if (hasCreatedAt) {
          await connection.query(`ALTER TABLE \`Users\` DROP COLUMN \`createdAt\``);
          console.log('✅ Removed "createdAt" column');
        }
        if (hasUpdatedAt) {
          await connection.query(`ALTER TABLE \`Users\` DROP COLUMN \`updatedAt\``);
          console.log('✅ Removed "updatedAt" column');
        }
      } catch (error) {
        console.log(`⚠️  Could not remove timestamp columns: ${error.message}`);
      }
    }

    // Verify the fix
    const [updatedColumns] = await connection.query("SHOW COLUMNS FROM `Users`");
    console.log('Updated columns:', updatedColumns.map(c => c.Field));
    console.log('✅ Users table structure fixed!');

  } catch (error) {
    console.error('❌ Error fixing Users table:', error.message);
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log('Column already exists with different name. Table might need manual fix.');
    }
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Run the fix
fixUserTable()
  .then(() => {
    console.log('Migration complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });

