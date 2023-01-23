import { useLoaderData } from 'react-router-dom';

export const Profile = () => {
  const messages = useLoaderData();
  console.log('messages: ', messages);

  return <div>Profile</div>;
};
