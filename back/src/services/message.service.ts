import Message from "../models/message.model";
import User from "../models/user.model";
import UserMessages from "../models/userMessages.model";
import { IUser } from "../types/user";

export const createMessage = async (
  title: string,
  message: string,
  fromId: number,
  toId: number
) => {
  const createdMessage = (
    await Message.create(
      {
        title,
        message
      },
      { returning: true }
    )
  ).toJSON();

  updateJunctionTable(fromId, toId, createdMessage.id);

  return createdMessage;
};

export const getUserMessages = async (userId: string) => {
  const messages = await UserMessages.findAll({
    where: {
      userId
    },
    include: {
      model: Message
    }
  });

  return messages.map(msg => {
    const { id, time, title, message, users } = msg.toJSON();
    return {
      id,
      title,
      message,
      time,
      users
      // from: (users as IUser[]).find(e => e.id === +userId)?.name,
      // to: (users as IUser[]).find(e => e.id !== +userId)?.name
    };
  });
};

const updateJunctionTable = async (
  fromId: number,
  toId: number,
  messageId: number
) => {
  const from = await User.findByPk(fromId);
  const to = await User.findByPk(toId);

  UserMessages.create({
    userId: from?.toJSON().id,
    messageId: messageId
  });
  UserMessages.create({
    userId: to?.toJSON().id,
    messageId: messageId,
    from: fromId
  });
};
