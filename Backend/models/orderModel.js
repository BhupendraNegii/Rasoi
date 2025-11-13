import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Order = sequelize.define(
  'Order',
  {
    Order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'Order_id', // Explicitly map to database column
    },
    User_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      field: 'User_id', // Explicitly map to database column
    },
    Phone_No: { 
      type: DataTypes.STRING, 
      allowNull: true,
      field: 'Phone_No', // Explicitly map to database column
    },
    Address: { 
      type: DataTypes.STRING, 
      allowNull: true,
      field: 'Address', // Explicitly map to database column
    },
    Status: { 
      type: DataTypes.ENUM(
        'Pending',
        'Food Processing',
        'Out for Delivery',
        'Delivered',
        'Cancelled'
      ), 
      defaultValue: 'Pending',
      allowNull: false,
      field: 'Status', // Explicitly map to database column
    },
    Amount: { 
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
      field: 'Amount', // Explicitly map to database column
    },
    Food_id: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      field: 'Food_id', // Explicitly map to database column
    },
    // Keep items JSON for backward compatibility (multiple items per order)
    items: { 
      type: DataTypes.JSON, 
      allowNull: true,
      field: 'items', // Explicitly map to database column
    },
    // Keep address as JSON for backward compatibility
    address: { 
      type: DataTypes.JSON, 
      allowNull: true,
      field: 'address', // Explicitly map to database column
    },
    // Keep payment field for backward compatibility
    payment: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: false,
      field: 'payment', // Explicitly map to database column
    },
    date: { 
      type: DataTypes.DATE, 
      defaultValue: DataTypes.NOW,
      field: 'date', // Explicitly map to database column
    },
  },
  { 
    tableName: 'Orders',
    timestamps: false,
    underscored: false, // Don't use snake_case conversion
  }
);

export default Order;
