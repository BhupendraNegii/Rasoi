import mysql from 'mysql2/promise';
import 'dotenv/config';

const fixOrdersTable = async () => {
  let connection;
  try {
    // Connect to database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'foodDeliveryApp',
    });

    console.log('✅ Connected to database\n');

    // Check if Orders table exists
    const [tables] = await connection.query(
      `SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = ? AND table_name = ?`,
      [process.env.DB_NAME || 'foodDeliveryApp', 'Orders']
    );

    if (tables[0].count === 0) {
      console.log('⚠️  Orders table does not exist. It will be created automatically when you start the server.');
      return;
    }

    // Get current columns
    const [columns] = await connection.query("SHOW COLUMNS FROM `Orders`");
    const columnNames = columns.map(col => col.Field);
    console.log('Current columns:', columnNames.join(', '));

    // Check and rename primary key from 'id' to 'Order_id'
    if (columnNames.includes('id') && !columnNames.includes('Order_id')) {
      console.log('\n🔄 Renaming primary key: id → Order_id');
      // Get the current column definition to preserve AUTO_INCREMENT
      const idColumn = columns.find(col => col.Field === 'id');
      const isAutoIncrement = idColumn && idColumn.Extra.includes('auto_increment');
      
      if (isAutoIncrement) {
        // Remove AUTO_INCREMENT first
        await connection.query("ALTER TABLE `Orders` MODIFY COLUMN `id` INT NOT NULL");
        // Drop primary key
        await connection.query("ALTER TABLE `Orders` DROP PRIMARY KEY");
        // Rename the column
        await connection.query("ALTER TABLE `Orders` CHANGE COLUMN `id` `Order_id` INT NOT NULL");
        // Add primary key first, then AUTO_INCREMENT
        await connection.query("ALTER TABLE `Orders` ADD PRIMARY KEY (`Order_id`)");
        await connection.query("ALTER TABLE `Orders` MODIFY COLUMN `Order_id` INT NOT NULL AUTO_INCREMENT");
      } else {
        // If not auto-increment, just rename
        await connection.query("ALTER TABLE `Orders` DROP PRIMARY KEY");
        await connection.query("ALTER TABLE `Orders` CHANGE COLUMN `id` `Order_id` INT");
        await connection.query("ALTER TABLE `Orders` ADD PRIMARY KEY (`Order_id`)");
      }
      console.log('✅ Primary key renamed to Order_id');
    } else if (columnNames.includes('Order_id')) {
      console.log('✅ Order_id column already exists');
      const orderIdCol = columns.find(col => col.Field === 'Order_id');
      const hasAutoInc = orderIdCol && orderIdCol.Extra && orderIdCol.Extra.includes('auto_increment');
      if (!hasAutoInc) {
        console.log('\n🔧 Ensuring Order_id is AUTO_INCREMENT');
        // Ensure no existing primary key conflicts
        await connection.query("ALTER TABLE `Orders` MODIFY COLUMN `Order_id` INT NOT NULL");
        await connection.query("ALTER TABLE `Orders` DROP PRIMARY KEY");
        await connection.query("ALTER TABLE `Orders` ADD PRIMARY KEY (`Order_id`)");
        await connection.query("ALTER TABLE `Orders` MODIFY COLUMN `Order_id` INT NOT NULL AUTO_INCREMENT");
        console.log('✅ Order_id set to AUTO_INCREMENT');
      }
    }

    // Check and rename 'userId' to 'User_id'
    if (columnNames.includes('userId') && !columnNames.includes('User_id')) {
      console.log('\n🔄 Renaming column: userId → User_id');
      await connection.query("ALTER TABLE `Orders` CHANGE COLUMN `userId` `User_id` INT");
      console.log('✅ Column renamed to User_id');
    } else if (columnNames.includes('User_id')) {
      console.log('✅ User_id column already exists');
    }

    // Check and rename 'amount' to 'Amount'
    if (columnNames.includes('amount') && !columnNames.includes('Amount')) {
      console.log('\n🔄 Renaming column: amount → Amount');
      await connection.query("ALTER TABLE `Orders` CHANGE COLUMN `amount` `Amount` DECIMAL(10,2)");
      console.log('✅ Column renamed to Amount');
    } else if (columnNames.includes('Amount')) {
      console.log('✅ Amount column already exists');
    }

    // Check and rename 'status' to 'Status'
    if (columnNames.includes('status') && !columnNames.includes('Status')) {
      console.log('\n🔄 Renaming column: status → Status');
      // Get the current ENUM values or use default
      await connection.query(`
        ALTER TABLE \`Orders\` 
        CHANGE COLUMN \`status\` \`Status\` 
        ENUM('Pending', 'Food Processing', 'Out for Delivery', 'Delivered', 'Cancelled') 
        NOT NULL DEFAULT 'Pending'
      `);
      console.log('✅ Column renamed to Status');
    } else if (columnNames.includes('Status')) {
      console.log('✅ Status column already exists');
    }

    // Add missing columns if they don't exist
    if (!columnNames.includes('Phone_No')) {
      console.log('\n➕ Adding column: Phone_No');
      try {
        await connection.query("ALTER TABLE `Orders` ADD COLUMN `Phone_No` VARCHAR(255) NULL");
        console.log('✅ Phone_No column added');
      } catch (error) {
        if (error.code === 'ER_DUP_FIELDNAME') {
          console.log('⚠️  Phone_No column already exists');
        } else {
          throw error;
        }
      }
    } else {
      console.log('✅ Phone_No column already exists');
    }

    // Check for Address column (case-insensitive)
    const hasAddress = columnNames.some(col => col.toLowerCase() === 'address');
    if (!hasAddress) {
      console.log('\n➕ Adding column: Address');
      try {
        await connection.query("ALTER TABLE `Orders` ADD COLUMN `Address` VARCHAR(255) NULL");
        console.log('✅ Address column added');
        // Refresh column list
        const [newColumns] = await connection.query("SHOW COLUMNS FROM `Orders`");
        columnNames.length = 0;
        columnNames.push(...newColumns.map(col => col.Field));
      } catch (error) {
        if (error.code === 'ER_DUP_FIELDNAME') {
          console.log('⚠️  Address column already exists');
        } else {
          throw error;
        }
      }
    } else {
      // Check if it's lowercase 'address' and needs to be renamed
      if (columnNames.includes('address') && !columnNames.includes('Address')) {
        console.log('\n🔄 Renaming column: address → Address (keeping JSON address field)');
        // Note: We keep the JSON 'address' field, so we need to check if 'Address' is the string field
        // Actually, we have both: 'address' (JSON) and 'Address' (VARCHAR)
        // So we should not rename 'address', just ensure 'Address' exists
        if (!columnNames.includes('Address')) {
          await connection.query("ALTER TABLE `Orders` ADD COLUMN `Address` VARCHAR(255) NULL");
          console.log('✅ Address column added');
        }
      } else {
        console.log('✅ Address column already exists');
      }
    }

    if (!columnNames.includes('Food_id')) {
      console.log('\n➕ Adding column: Food_id');
      try {
        await connection.query("ALTER TABLE `Orders` ADD COLUMN `Food_id` INT NULL");
        console.log('✅ Food_id column added');
      } catch (error) {
        if (error.code === 'ER_DUP_FIELDNAME') {
          console.log('⚠️  Food_id column already exists');
        } else {
          throw error;
        }
      }
    } else {
      console.log('✅ Food_id column already exists');
    }

    // Remove old userId column if it exists (replaced by User_id)
    if (columnNames.includes('userId') && columnNames.includes('User_id')) {
      console.log('\n🗑️  Removing old column: userId (replaced by User_id)');
      try {
        await connection.query("ALTER TABLE `Orders` DROP COLUMN `userId`");
        console.log('✅ userId column removed');
      } catch (error) {
        console.log('⚠️  Could not remove userId column:', error.message);
      }
    }

    // Verify primary key exists
    const [keys] = await connection.query(
      `SELECT COLUMN_NAME FROM information_schema.KEY_COLUMN_USAGE 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND CONSTRAINT_NAME = 'PRIMARY'`,
      [process.env.DB_NAME || 'foodDeliveryApp', 'Orders']
    );
    
    if (keys.length === 0 && columnNames.includes('Order_id')) {
      console.log('\n🔑 Adding primary key to Order_id');
      try {
        await connection.query("ALTER TABLE `Orders` ADD PRIMARY KEY (`Order_id`)");
        console.log('✅ Primary key added');
      } catch (error) {
        console.log('⚠️  Could not add primary key:', error.message);
      }
    } else if (keys.length > 0) {
      console.log(`✅ Primary key exists: ${keys[0].COLUMN_NAME}`);
    }

    // Remove createdAt and updatedAt if they exist (since timestamps: false)
    if (columnNames.includes('createdAt')) {
      console.log('\n🗑️  Removing column: createdAt');
      await connection.query("ALTER TABLE `Orders` DROP COLUMN `createdAt`");
      console.log('✅ createdAt column removed');
    }

    if (columnNames.includes('updatedAt')) {
      console.log('\n🗑️  Removing column: updatedAt');
      await connection.query("ALTER TABLE `Orders` DROP COLUMN `updatedAt`");
      console.log('✅ updatedAt column removed');
    }

    // Verify final structure
    console.log('\n📋 Verifying final structure...');
    const [finalColumns] = await connection.query("SHOW COLUMNS FROM `Orders`");
    const finalColumnNames = finalColumns.map(col => col.Field);
    console.log('Final columns:', finalColumnNames.join(', '));

    const expectedColumns = ['Order_id', 'User_id', 'Phone_No', 'Address', 'Status', 'Amount', 'Food_id', 'items', 'address', 'payment', 'date'];
    const missing = expectedColumns.filter(col => !finalColumnNames.includes(col));
    
    if (missing.length === 0) {
      console.log('\n✅ Orders table structure is now correct!');
    } else {
      console.log(`\n⚠️  Still missing columns: ${missing.join(', ')}`);
      console.log('💡 These will be added automatically by Sequelize sync with alter: true');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log('💡 Column already exists, skipping...');
    } else if (error.code === 'ER_BAD_FIELD_ERROR') {
      console.log('💡 Column does not exist, skipping rename...');
    } else {
      throw error;
    }
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n✅ Database connection closed');
    }
  }
};

fixOrdersTable()
  .then(() => {
    console.log('\n✅ Orders table fix complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Orders table fix failed:', error);
    process.exit(1);
  });

