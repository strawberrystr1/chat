import { IMessageWithUsers } from "./message";

export interface IUser {
  id: number;
  name: string;
}

export interface IUserWithMessages extends IUser {
  messages: IMessageWithUsers[];
}

export interface IUserWithJunctionDestination extends IUser {
  user_messages: {
    destination: number;
    self: boolean;
  };
}
