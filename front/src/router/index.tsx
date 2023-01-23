import { createBrowserRouter } from 'react-router-dom';

import { LoginForm } from '../components/LoginForm';
import { Profile } from '../components/Profile';
import { API_URL } from '../constants';

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

      const response = await fetch(`${API_URL}/message?id=${id}`);
      const userMessages = await response.json();

      return userMessages;
    },
  },
]);
