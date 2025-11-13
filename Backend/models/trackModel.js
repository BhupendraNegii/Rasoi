import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Track = sequelize.define(
  'Track',
  {
    Order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'Order_id', // Explicitly map to database column
    },
    Order_time: { 
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'Order_time', // Explicitly map to database column
    },
    Status: { 
      type: DataTypes.ENUM(
        'Pending',
        'Food Processing',
        'Out for Delivery',
        'Delivered',
        'Cancelled'
      ), 
      allowNull: false,
      field: 'Status', // Explicitly map to database column
    },
    Uodate_time: { 
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'Uodate_time', // Explicitly map to database column
    },
    User_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      field: 'User_id', // Explicitly map to database column
    },
  },
  { 
    tableName: 'Track',
    timestamps: false,
    underscored: false, // Don't use snake_case conversion
  }
);

export default Track;

