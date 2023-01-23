import { IMessageWithUsers } from "./message";

export interface IUser {
  id: number;
  name: string;
}

export interface IUserWithMessages extends IUser {
  messages: IMessageWithUsers[];
}
