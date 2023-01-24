import { IMessage } from './message';

export interface IUser {
  id: number;
  name: string;
}

export interface IUsersWithMessages {
  users: IUser[];
  messages: IMessage[];
}

export interface IProfilePageData extends IUsersWithMessages {
  currentUser: IUser
}