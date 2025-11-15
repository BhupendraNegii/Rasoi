import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const ReservationHistory = sequelize.define(
  'ReservationHistory',
  {
    history_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'history_id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email',
    },
    reservation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'reservation_date',
    },
    reservation_time: {
      type: DataTypes.TIME,
      allowNull: false,
      field: 'reservation_time',
    },
    request: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'request',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
    },
    ended_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'ended_at',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'expired',
      field: 'status',
    },
  },
  {
    tableName: 'reservation_history',
    timestamps: false,
    underscored: false,
  }
);

export default ReservationHistory;