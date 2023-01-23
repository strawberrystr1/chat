import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Wrapper = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px 0;
`;

export const SideWrapper = styled(Box)`
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

export const Avatar = styled(Box)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #65c724;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
