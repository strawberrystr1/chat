import { DataTypes } from "sequelize";
import dbClient from "../db";
import Message from "./message.model";
import User from "./user.model";

const UserMessages = dbClient.define(
  "user_messages",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id"
      },
      unique: false
    },
    messageId: {
      type: DataTypes.INTEGER,
      references: {
        model: Message,
        key: "id"
      },
      unique: false
    },
    destination: {
      type: DataTypes.INTEGER,
      unique: false
    },
    self: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  { timestamps: false, freezeTableName: true }
);

export default UserMessages;
