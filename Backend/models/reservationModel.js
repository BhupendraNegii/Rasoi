import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Reservation = sequelize.define(
  'Reservation',
  {
    reservation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'reservation_id', // Explicitly map to database column
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name', // Explicitly map to database column
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email', // Explicitly map to database column
    },
    reservation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'reservation_date', // Explicitly map to database column
    },
    reservation_time: {
      type: DataTypes.TIME,
      allowNull: false,
      field: 'reservation_time', // Explicitly map to database column
    },
    request: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'request', // Explicitly map to database column
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      field: 'created_at', // Explicitly map to database column
    },
  },
  {
    tableName: 'reservations',
    timestamps: false,
    underscored: false, // Don't use snake_case conversion
  }
);

export default Reservation;

