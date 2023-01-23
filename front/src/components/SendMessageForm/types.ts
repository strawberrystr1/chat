import { IUser } from '../../types/user';

export interface IProps {
  isOpen: boolean;
  handleClose: () => void;
  users: IUser[];
  sendMessage: (title: string, message: string, to: number) => void;
}
