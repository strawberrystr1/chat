import { IUser } from "./user";

export interface IMessage {
  id: number;
  title: string;
  message: string;
  time: string;
}

export interface IMessageWithUsers extends IMessage {
  users: IUser[];
}

export interface IExpandedMessage extends IMessage {
  from: string;
  to: string;
}