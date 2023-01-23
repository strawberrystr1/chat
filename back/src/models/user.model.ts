import { DataTypes } from 'sequelize';

import dbClient from "../db";

const User = dbClient.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  timestamps: false,
  freezeTableName: true,
})

export default User;

