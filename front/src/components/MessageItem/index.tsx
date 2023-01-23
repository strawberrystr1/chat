import { FC, memo } from 'react';
import { Typography } from '@mui/material';

import { FlexBetweenWrapper, FlexBox, FlexBoxLeft, MessageWrapper, Wrapper } from './styled';
import { IProps } from './types';

const MessageItem: FC<IProps> = ({ message: { id, title, message, time, from, to } }) => {
  return (
    <Wrapper>
      <FlexBetweenWrapper>
        <Typography fontSize={20}>ID: {id}</Typography>
        <FlexBox>
          <Typography fontSize={20}>From:</Typography>
          <Typography fontWeight={600} fontSize={22}>
            {from}
          </Typography>
        </FlexBox>
        <FlexBoxLeft>
          <Typography fontSize={20}>To:</Typography>
          <Typography fontWeight={600} fontSize={22}>
            {to}
          </Typography>
        </FlexBoxLeft>
      </FlexBetweenWrapper>
      <FlexBetweenWrapper sx={{ mt: 1 }}>
        <Typography fontSize={18}>Title: {title}</Typography>
        <Typography>
          {new Date(time).toLocaleDateString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
          })}
        </Typography>
      </FlexBetweenWrapper>
      <MessageWrapper>
        <Typography>{message}</Typography>
      </MessageWrapper>
    </Wrapper>
  );
};

export default memo(MessageItem);
