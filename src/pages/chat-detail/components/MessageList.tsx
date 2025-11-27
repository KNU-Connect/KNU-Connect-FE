import styled from '@emotion/styled';
import type { ChatMessage } from '@/types/chat';
import { MessageItem } from './MessageItem';
import { formatTime } from '../../chat/utils/formatTime';

type MessageListProps = {
  messages: ChatMessage[];
  currentUserId: string;
};

export const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  let lastDate: string | undefined;
  let lastSenderId: string | undefined;

  return (
    <Container>
      {messages.map((message, index) => {
        const isCurrentUser = message.senderId === currentUserId;
        const showDate = message.date && message.date !== lastDate;
        if (message.date) lastDate = message.date;

        const isSameSender =
          !isCurrentUser &&
          lastSenderId === message.senderId &&
          index > 0 &&
          !showDate;
        const showProfile = !isCurrentUser && !isSameSender;

        lastSenderId = message.senderId;

        return (
          <MessageItem
            key={message.id}
            message={message}
            isCurrentUser={isCurrentUser}
            showProfile={showProfile}
            showDate={!!showDate}
            formatTime={formatTime}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[4]};
  flex: 1;
  overflow-y: auto;
`;
