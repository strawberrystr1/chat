import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Wrapper = styled(Box)`
  width: 100%;
  border: 1px solid white;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px 10px;
`;

export const FlexBetweenWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

export const FlexBox = styled(Box)`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const FlexBoxLeft = styled(FlexBox)`
  justify-content: flex-start;
`;

export const MessageWrapper = styled(Box)`
  overflow: auto;
  max-height: 100px;
  border: 1px solid black;
  padding: 5px;
  border-radius: 5px;
`;
