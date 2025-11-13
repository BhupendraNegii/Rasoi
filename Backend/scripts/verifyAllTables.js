import mysql from 'mysql2/promise';
import 'dotenv/config';

const verifyAllTables = async () => {
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

    // Define expected table structures
    const expectedTables = {
      Users: {
        columns: ['user_id', 'user_name', 'Email', 'Password', 'Cart_data', 'Favorite_item'],
        primaryKey: 'user_id',
      },
      Food_items: {
        columns: ['Food_id', 'Food_Name', 'Amount', 'Category', 'description', 'image'],
        primaryKey: 'Food_id',
      },
      Orders: {
        columns: ['Order_id', 'User_id', 'Phone_No', 'Address', 'Status', 'Amount', 'Food_id', 'items', 'address', 'payment', 'date'],
        primaryKey: 'Order_id',
      },
      reservations: {
        columns: ['reservation_id', 'name', 'email', 'reservation_date', 'reservation_time', 'request', 'created_at'],
        primaryKey: 'reservation_id',
      },
      Transactions: {
        columns: ['transaction_id', 'Order_id', 'user_id', 'Datetime', 'Payment_Amount'],
        primaryKey: 'transaction_id',
      },
      Track: {
        columns: ['Order_id', 'Order_time', 'Status', 'Uodate_time', 'User_id'],
        primaryKey: 'Order_id',
      },
    };

    const issues = [];
    const fixed = [];

    // Check each table
    for (const [tableName, expected] of Object.entries(expectedTables)) {
      console.log(`\n📋 Checking table: ${tableName}`);
      
      try {
        // Check if table exists
        const [tables] = await connection.query(
          `SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = ? AND table_name = ?`,
          [process.env.DB_NAME || 'foodDeliveryApp', tableName]
        );

        if (tables[0].count === 0) {
          console.log(`   ⚠️  Table ${tableName} does not exist`);
          issues.push({ table: tableName, issue: 'Table does not exist' });
          continue;
        }

        // Get actual columns
        const [columns] = await connection.query(`SHOW COLUMNS FROM \`${tableName}\``);
        const actualColumns = columns.map(col => col.Field);
        const actualColumnTypes = {};
        columns.forEach(col => {
          actualColumnTypes[col.Field] = col.Type;
        });

        // Check for missing columns (case-insensitive check)
        const actualColumnsLower = actualColumns.map(col => col.toLowerCase());
        const missingColumns = expected.columns.filter(col => !actualColumnsLower.includes(col.toLowerCase()));
        if (missingColumns.length > 0) {
          console.log(`   ⚠️  Missing columns: ${missingColumns.join(', ')}`);
          issues.push({ table: tableName, issue: `Missing columns: ${missingColumns.join(', ')}` });
        }

        // Check for extra columns (excluding Sequelize timestamps if timestamps: false)
        const extraColumns = actualColumns.filter(
          col => !expected.columns.includes(col) && col !== 'createdAt' && col !== 'updatedAt'
        );
        if (extraColumns.length > 0) {
          console.log(`   ⚠️  Extra columns (may be safe to ignore): ${extraColumns.join(', ')}`);
        }

        // Check primary key
        const [keys] = await connection.query(
          `SELECT COLUMN_NAME FROM information_schema.KEY_COLUMN_USAGE 
           WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND CONSTRAINT_NAME = 'PRIMARY'`,
          [process.env.DB_NAME || 'foodDeliveryApp', tableName]
        );
        
        if (keys.length > 0) {
          const actualPK = keys[0].COLUMN_NAME;
          if (actualPK !== expected.primaryKey) {
            console.log(`   ⚠️  Primary key mismatch: expected ${expected.primaryKey}, found ${actualPK}`);
            issues.push({ table: tableName, issue: `Primary key mismatch: expected ${expected.primaryKey}, found ${actualPK}` });
          } else {
            console.log(`   ✅ Primary key correct: ${actualPK}`);
          }
        } else {
          console.log(`   ⚠️  No primary key found`);
          issues.push({ table: tableName, issue: 'No primary key found' });
        }

        // Check for required columns
        const requiredColumns = expected.columns.filter(col => {
          // user_id, Food_id, Order_id, reservation_id, transaction_id are required
          return col.includes('_id') || col === 'Email' || col === 'Password' || col === 'user_name' || 
                 col === 'Food_Name' || col === 'Amount' || col === 'Category' || 
                 col === 'Status' || col === 'name' || col === 'email' || col === 'reservation_date' || 
                 col === 'reservation_time';
        });

        for (const reqCol of requiredColumns) {
          if (!actualColumnsLower.includes(reqCol.toLowerCase())) {
            console.log(`   ❌ Required column missing: ${reqCol}`);
            issues.push({ table: tableName, issue: `Required column missing: ${reqCol}` });
          }
        }

        if (missingColumns.length === 0 && keys.length > 0 && keys[0].COLUMN_NAME === expected.primaryKey) {
          console.log(`   ✅ Table structure is correct`);
        }

      } catch (error) {
        console.log(`   ❌ Error checking table: ${error.message}`);
        issues.push({ table: tableName, issue: `Error: ${error.message}` });
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 VERIFICATION SUMMARY');
    console.log('='.repeat(60));
    
    if (issues.length === 0) {
      console.log('✅ All tables are correctly structured!');
    } else {
      console.log(`⚠️  Found ${issues.length} issue(s):`);
      issues.forEach((issue, index) => {
        console.log(`   ${index + 1}. ${issue.table}: ${issue.issue}`);
      });
      console.log('\n💡 Run `npm run fix-user-table` to fix the Users table if needed.');
      console.log('💡 For other tables, Sequelize sync with alter: true should fix them automatically.');
    }

    console.log('\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('💡 Database does not exist. It will be created automatically when you start the server.');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('💡 Cannot connect to MySQL. Make sure MySQL is running.');
    }
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

verifyAllTables()
  .then(() => {
    console.log('✅ Verification complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  });

