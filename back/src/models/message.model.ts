import { DataTypes } from "sequelize";

import dbClient from "../db";

const Message = dbClient.define(
  "message",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now()
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

export default Message;
