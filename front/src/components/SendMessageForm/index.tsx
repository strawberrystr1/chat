import { ChangeEvent, FC, useState } from 'react';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

import { IUser } from '../../types/user';

import { TextArea } from './styled';
import { IProps } from './types';

export const SendMessageForm: FC<IProps> = ({ isOpen, handleClose, users, sendMessage }) => {
  const [selectValueVisible, setSelectValueVisible] = useState('');
  const [selectValue, setSelectValue] = useState<IUser | null>(null);
  const [title, setTitle] = useState('');
  const [textValue, setTextValue] = useState('');

  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const handleSend = () => {
    if (selectValue) {
      sendMessage(title, textValue, selectValue.id);
      handleClose();
    }
  };

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCancel = () => {
    setSelectValue(null);
    setSelectValueVisible('');
    setTitle('');
    setTextValue('');
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Send message to...</DialogTitle>
      <DialogContent>
        <Autocomplete
          disablePortal={true}
          sx={{ width: 500 }}
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
          Cancel
        </Button>
        <Button onClick={handleSend} color="success" variant="contained">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};
