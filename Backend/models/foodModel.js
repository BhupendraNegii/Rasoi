import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Food = sequelize.define(
  'Food',
  {
    Food_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'Food_id', // Explicitly map to database column
    },
    Food_Name: { 
      type: DataTypes.STRING, 
      allowNull: false,
      field: 'Food_Name', // Explicitly map to database column
    },
    Amount: { 
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
      field: 'Amount', // Explicitly map to database column
    },
    Category: { 
      type: DataTypes.STRING, 
      allowNull: false,
      field: 'Category', // Explicitly map to database column
    },
    // Additional fields for compatibility (description and image)
    description: { 
      type: DataTypes.TEXT, 
      allowNull: true,
      field: 'description', // Explicitly map to database column
    },
    image: { 
      type: DataTypes.STRING, 
      allowNull: true,
      field: 'image', // Explicitly map to database column
    },
  },
  { 
    tableName: 'Food_items',
    timestamps: false,
    underscored: false, // Don't use snake_case conversion
  }
);

export default Food;
