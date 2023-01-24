import { IUserWithJunctionDestination } from "./user";

export interface IMessage {
  id: number;
  title: string;
  message: string;
  time: string;
}

export interface IMessageWithUsers extends IMessage {
  users: IUserWithJunctionDestination[];
}

export interface IExpandedMessage extends IMessage {
  from: string;
  to: string;
}