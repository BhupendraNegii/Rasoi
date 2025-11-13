import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Transaction = sequelize.define(
  'Transaction',
  {
    transaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'transaction_id', // Explicitly map to database column
    },
    Order_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      field: 'Order_id', // Explicitly map to database column
    },
    user_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      field: 'user_id', // Explicitly map to database column
    },
    Datetime: { 
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'Datetime', // Explicitly map to database column
    },
    Payment_Amount: { 
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
      field: 'Payment_Amount', // Explicitly map to database column
    },
  },
  { 
    tableName: 'Transactions',
    timestamps: false,
    underscored: false, // Don't use snake_case conversion
  }
);

export default Transaction;

