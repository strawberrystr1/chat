import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Wrapper = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 300px;
  height: 300px;
  border: 1px solid rgba(42, 224, 10, 0.59);
  border-radius: 10px;
  flex-direction: column;
  background-color: #ffffff6a;
  box-shadow: 0px 0px 17px 0px rgba(42, 224, 10, 0.59);
`;
