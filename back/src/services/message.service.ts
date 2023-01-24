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
              attributes: ["destination", "self"]
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

  return transformUserData(user);
};

const updateJunctionTable = async (
  fromId: number,
  toId: number,
  messageId: number
) => {
  const from = (await User.findByPk(fromId))?.toJSON();
  const to = (await User.findByPk(toId))?.toJSON();

  if (fromId === toId) {
    await UserMessages.create({
      userId: from.id,
      messageId: messageId,
      self: true
    });
  } else {
    await UserMessages.create({
      userId: from.id,
      messageId: messageId,
      destination: to.id
    });
    await UserMessages.create({
      userId: to.id,
      messageId: messageId
    });
  }
};

const transformUserData = (user: IUserWithMessages): IExpandedMessage[] => {
  const expandedMessages: IExpandedMessage[] = user.messages
    .filter(
      e =>
        e &&
        e.users.find(
          u => u.user_messages.destination === user.id || u.user_messages.self
        )
    )
    .map(msg => {
      const { id, time, title, message, users } = msg;

      return {
        id,
        time,
        title,
        message,
        from: users.find(e => e.id !== user.id || e.user_messages.self)
          ?.name as string,
        to: users.find(e => e.id === user.id || e.user_messages.self)
          ?.name as string
      };
    })
    .sort((a, b) => b.id - a.id);

  return expandedMessages;
};
