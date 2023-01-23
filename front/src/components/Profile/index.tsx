import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Alert, Button, Snackbar, Typography } from '@mui/material';

import { SOCKET_URL } from '../../constants';
import { IMessage } from '../../types/message';
import { IUsersWithMessages } from '../../types/user';
import MessageItem from '../MessageItem';
import { SendMessageForm } from '../SendMessageForm';

import { Avatar, SideWrapper, Wrapper } from './styled';

type SnackSeverity = 'error' | 'info' | 'success';

export const Profile = () => {
  const { messages, users } = useLoaderData() as IUsersWithMessages;

  const [messagesState, setMessagesState] = useState<IMessage[]>(() => messages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [messageType, setMessageType] = useState<SnackSeverity>('info');

  const ws = new WebSocket(SOCKET_URL);

  useEffect(() => {
    ws.onopen = () => {
      setIsSnackOpen(true);
      setSnackMessage('Connection open');
      setMessageType('success');
      ws.send(JSON.stringify({ user: users.find(e => e.name === messages[0].from)?.id }));
      // добавить бзера в стор или взять с роутера
      
    };

    ws.onerror = () => {
      setIsSnackOpen(true);
      setSnackMessage('Socket error');
      setMessageType('error');
    };

    ws.onclose = () => {
      setIsSnackOpen(true);
      setSnackMessage('Socket close');
      setMessageType('error');
    };

    ws.onmessage = msg => {
      setMessagesState(prev => [...prev, JSON.parse(msg.data)]);
      setIsSnackOpen(true);
      setSnackMessage('Message received');
      setMessageType('info');
    };
  }, []);

  const resetSnack = () => {
    setIsSnackOpen(false);
    setSnackMessage('');
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeHandler = () => setIsModalOpen(false);

  const sendMessage = (title: string, message: string, to: number) => {
    if (ws.OPEN === 1) {
      ws.send(
        JSON.stringify({
          title,
          message,
          to,
          from: users.find(e => e.name === messages[0].from)?.id,
        })
      );
      setIsSnackOpen(true);
      setSnackMessage('Message sent');
      setMessageType('success');
    }
  };

  return (
    <Wrapper>
      <SideWrapper>
        {/* Add user id from storage */}
        <Avatar>
          {/* <Typography fontSize={30}>{messagesState[0].from[0].toUpperCase()}</Typography> */}
        </Avatar>
        <Typography fontSize={30} sx={{ mb: 3 }}>
          {/* {messagesState[0].from} */}
        </Typography>
        <Button size="large" variant="contained" onClick={handleClick}>
          Text to...
        </Button>
      </SideWrapper>
      <SideWrapper>
        {messagesState.map(msg => (
          <MessageItem key={msg.id} message={msg} />
        ))}
      </SideWrapper>
      <SendMessageForm
        isOpen={isModalOpen}
        handleClose={closeHandler}
        users={users}
        sendMessage={sendMessage}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isSnackOpen}
        autoHideDuration={2000}
        onClose={resetSnack}
        sx={{ width: 300, height: 70 }}
      >
        <Alert onClose={resetSnack} severity={messageType} sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};
