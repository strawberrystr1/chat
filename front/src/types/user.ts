import { IMessage } from './message';

export interface IUser {
  id: number;
  name: string;
}

export interface IUsersWithMessages {
  users: IUser[];
  messages: IMessage[];
}
