import Message from "../models/message.model";
import User from "../models/user.model";
import UserMessages from "../models/userMessages.model";
import { IExpandedMessage } from "../types/message";
import { IUser, IUserWithMessages } from "../types/user";
import { getUsersById } from "./user.service";

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

  const users: IUser[] = await getUsersById([fromId, toId]);

  return {
    ...createdMessage,
    from: users.find(e => e.id === fromId)?.name,
    to: users.find(e => e.id === toId)?.name
  };
};

export const getUserMessages = async (userId: string) => {
  const user = (
    await User.findByPk(userId, {
      include: {
        model: Message,
        include: [
          {
            model: User,
            through: {
              attributes: []
            },
            attributes: ["id", "name"]
          }
        ],
        through: {
          attributes: []
        }
      }
    })
  )?.toJSON() as IUserWithMessages;

  const expandedMessages: IExpandedMessage[] = user.messages
    .map(msg => {
      const { id, time, title, message, users } = msg;

      return {
        id,
        time,
        title,
        message,
        from: users.find(e => e.id === +userId)?.name as string,
        to: users.find(e => e.id !== +userId)?.name as string
      };
    })
    .sort((a, b) => b.id - a.id);

  return expandedMessages;
};

const updateJunctionTable = async (
  fromId: number,
  toId: number,
  messageId: number
) => {
  const from = await User.findByPk(fromId);
  const to = await User.findByPk(toId);

  await UserMessages.create({
    userId: from?.toJSON().id,
    messageId: messageId
  });

  await UserMessages.create({
    userId: to?.toJSON().id,
    messageId: messageId
  });
};
