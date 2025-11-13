import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';

// Sequelize instance — configure via environment variables
export const sequelize = new Sequelize(
  process.env.DB_NAME || 'foodDeliveryApp',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
  }
);

const ConnectDb = async () => {
  try {
    await sequelize.authenticate();
    // Sync will create tables if they don't exist without altering existing columns
    await sequelize.sync();
    console.log('Database connected ✅');
  } catch (error) {
    // If database does not exist, try to create it and retry
    console.log('Database connection error ❌:', error);
    try {
      if (error?.parent?.errno === 1049 || /Unknown database/.test(error?.message)) {
        console.log('Attempting to create database', process.env.DB_NAME || 'foodDeliveryApp');
        const connection = await mysql.createConnection({
          host: process.env.DB_HOST || 'localhost',
          user: process.env.DB_USER || 'root',
          password: process.env.DB_PASS || '',
        });
        const dbName = process.env.DB_NAME || 'foodDeliveryApp';
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
        await connection.end();
        // retry sequelize authenticate and sync
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Database created and connected ✅');
        return;
      }
    } catch (createError) {
      console.log('Error creating database ❌:', createError);
    }
  }
};

export default ConnectDb;
