import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const resetDatabase = async () => {
  let connection;
  
  try {
    // Connect to MySQL server (without specifying database)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
    });

    const dbName = process.env.DB_NAME || 'foodDeliveryApp';
    
    console.log(`🗑️  Dropping database: ${dbName}...`);
    await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\``);
    console.log(`✅ Database dropped successfully`);

    console.log(`🆕 Creating new database: ${dbName}...`);
    await connection.query(
      `CREATE DATABASE \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    console.log(`✅ Database created successfully`);

    await connection.end();
    console.log(`\n✨ Database reset complete!`);
    console.log(`📝 Now run: npm start (or nodemon server.js)`);
    console.log(`   Sequelize will automatically create all tables.`);
    
  } catch (error) {
    console.error('❌ Error resetting database:', error.message);
    if (connection) {
      await connection.end();
    }
    process.exit(1);
  }
};

resetDatabase();

