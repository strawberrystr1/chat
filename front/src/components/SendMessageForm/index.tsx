import { ChangeEvent, FC, useState } from 'react';
import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

import { IUser } from '../../types/user';

import { TextArea, Wrapper } from './styled';
import { IProps } from './types';

export const SendMessageForm: FC<IProps> = ({ users, sendMessage }) => {
  const [selectValueVisible, setSelectValueVisible] = useState('');
  const [selectValue, setSelectValue] = useState<IUser | null>(null);
  const [title, setTitle] = useState('');
  const [textValue, setTextValue] = useState('');

  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCancel = () => {
    setSelectValue(null);
    setSelectValueVisible('');
    setTitle('');
    setTextValue('');
  };

  const handleSend = () => {
    if (selectValue) {
      sendMessage(title, textValue, selectValue.id);
      handleCancel();
    }
  };

  const isSendButtonDisabled = !textValue || !selectValue || !title;

  return (
    <Wrapper>
      <DialogTitle>Send message to...</DialogTitle>
      <DialogContent>
        <Autocomplete
          disablePortal={true}
          sx={{ width: '100%' }}
          options={users}
          getOptionLabel={option => option.name}
          renderInput={params => <TextField {...params} label="Username" margin="dense" />}
          inputValue={selectValueVisible}
          onInputChange={(event, newValue) => {
            setSelectValueVisible(newValue);
          }}
          value={selectValue}
          onChange={(event, newValue) => {
            setSelectValue(newValue);
          }}
        />
        <TextField
          margin="dense"
          label="Title"
          value={title}
          onChange={handleTitle}
          sx={{ width: '100%' }}
        />
        <Typography fontSize={14}>Type your message here</Typography>
        <TextArea value={textValue} onChange={handleTextarea} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="error" variant="contained">
          reset
        </Button>
        <Button
          onClick={handleSend}
          color="success"
          variant="contained"
          disabled={isSendButtonDisabled}
        >
          Send
        </Button>
      </DialogActions>
    </Wrapper>
  );
};
