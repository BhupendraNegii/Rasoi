import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const User = sequelize.define(
  'User',
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'user_id', // Explicitly map to database column
    },
    user_name: { 
      type: DataTypes.STRING, 
      allowNull: false,
      field: 'user_name', // Explicitly map to database column
    },
    Email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true,
      field: 'Email', // Explicitly map to database column
    },
    Password: { 
      type: DataTypes.STRING, 
      allowNull: false,
      field: 'Password', // Explicitly map to database column
    },
    Cart_data: { 
      type: DataTypes.JSON, 
      defaultValue: {},
      field: 'Cart_data', // Explicitly map to database column
    },
    Favorite_item: { 
      type: DataTypes.JSON, 
      defaultValue: [],
      field: 'Favorite_item', // Explicitly map to database column
    },
  },
  { 
    tableName: 'Users',
    timestamps: false,
    underscored: false, // Don't use snake_case conversion
  }
);

export default User;