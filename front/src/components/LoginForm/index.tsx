import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { TextField, Typography } from '@mui/material';

import { API_URL, JSON_HEADERS } from '../../constants';

import { FormWrapper, Wrapper } from './styled';

export const LoginForm = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleLoginClick = async () => {
    const response = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify({ name }),
    });

    const user = await response.json();
    console.log(user);
    setIsLoading(false);
    navigate(`/profile/${user.id}`);
  };

  return (
    <Wrapper>
      <FormWrapper>
        <Typography fontSize={22} fontWeight={600}>
          Enter you name
        </Typography>
        <TextField label="Name" value={name} onChange={handleChange} />
        <LoadingButton
          onClick={handleLoginClick}
          variant="contained"
          color="success"
          loading={isLoading}
        >
          Login
        </LoadingButton>
      </FormWrapper>
    </Wrapper>
  );
};
