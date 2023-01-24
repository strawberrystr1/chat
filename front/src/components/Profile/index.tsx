import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Alert, Avatar, Snackbar, Typography } from '@mui/material';

import { SOCKET_URL } from '../../constants';
import { IMessage } from '../../types/message';
import { IProfilePageData } from '../../types/user';
import MessageItem from '../MessageItem';
import { SendMessageForm } from '../SendMessageForm';

import { MessagesBlock, SideWrapper, Wrapper } from './styled';

type SnackSeverity = 'error' | 'info' | 'success';

export const Profile = () => {
  const { messages, users, currentUser } = useLoaderData() as IProfilePageData;

  const [messagesState, setMessagesState] = useState<IMessage[]>(() => messages);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [messageType, setMessageType] = useState<SnackSeverity>('info');
  const [isMessageReceived, setIsMessageReceived] = useState(false);

  const ws = new WebSocket(SOCKET_URL);

  useEffect(() => {
    ws.onopen = () => {
      setIsSnackOpen(true);
      setSnackMessage('Connection open');
      setMessageType('success');
      ws.send(JSON.stringify({ user: currentUser.id }));
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
      setMessagesState(prev => [JSON.parse(msg.data), ...prev]);
      setIsSnackOpen(true);
      setSnackMessage(JSON.parse(msg.data).message);
      setMessageType('info');
      setIsMessageReceived(true);
    };
  }, []);

  const resetSnack = () => {
    setIsSnackOpen(false);
    setSnackMessage('');
    setIsMessageReceived(false);
  };

  const sendMessage = (title: string, message: string, to: number) => {
    if (ws.OPEN === 1) {
      ws.send(
        JSON.stringify({
          title,
          message,
          to,
          from: currentUser.id,
        })
      );
      setIsSnackOpen(true);
      setSnackMessage('Message sent');
      setMessageType('success');
    }
  };

  return (
    <Wrapper>
      <SideWrapper sx={{ maxWidth: '20%' }}>
        <Avatar>
          <Typography fontSize={30}>{currentUser.name[0].toUpperCase()}</Typography>
        </Avatar>
        <Typography fontSize={20}>ID: {currentUser.id}</Typography>
        <Typography fontSize={30} sx={{ mb: 3 }}>
          {currentUser.name}
        </Typography>
      </SideWrapper>
      <SideWrapper>
        <SendMessageForm users={users} sendMessage={sendMessage} />
        <MessagesBlock>
          {messagesState.map(msg => (
            <MessageItem key={msg.id} message={msg} />
          ))}
        </MessagesBlock>
      </SideWrapper>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isSnackOpen}
        autoHideDuration={2000}
        onClose={resetSnack}
        sx={{ width: 400 }}
      >
        <Alert onClose={resetSnack} severity={messageType} sx={{ width: '100%' }}>
          {isMessageReceived && (
            <Typography fontSize={18}>Message from: {messagesState[0].from}</Typography>
          )}
          {snackMessage.slice(0, 40)}
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};
