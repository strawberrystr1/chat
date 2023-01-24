import { IUser } from '../../types/user';

export interface IProps {
  users: IUser[];
  sendMessage: (title: string, message: string, to: number) => void;
}
