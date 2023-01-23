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
      }
    },
    messageId: {
      type: DataTypes.INTEGER,
      references: {
        model: Message,
        key: "id"
      }
    },
  },
  { timestamps: false, freezeTableName: true }
);

export default UserMessages;
