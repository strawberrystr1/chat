import { createBrowserRouter } from 'react-router-dom';

import { LoginForm } from '../components/LoginForm';
import { Profile } from '../components/Profile';
import { API_URL } from '../constants';
import { IUsersWithMessages } from '../types/user';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm />,
  },
  {
    path: '/profile/:id',
    element: <Profile />,
    loader: async ({ params }) => {
      const { id } = params;

      const response = await fetch(`${API_URL}/user?messages=true&id=${id}`);
      const data: IUsersWithMessages = await response.json();

      const currentUser = data.users.find(e => e.id === +(id as string));

      return { ...data, currentUser };
    },
  },
]);
