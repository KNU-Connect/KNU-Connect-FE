import styled from '@emotion/styled';
import type { ChatMessage } from '@/types/chat';
import { MessageItem } from './MessageItem';
import { formatTime } from '../../chat/utils/formatTime';

type MessageListProps = {
  messages: ChatMessage[];
  currentUserId: string;
  isBottomSheetOpen?: boolean;
};

export const MessageList = ({
  messages,
  currentUserId,
  isBottomSheetOpen = false,
}: MessageListProps) => {
  let lastDate: string | undefined;
  let lastSenderId: string | undefined;

  return (
    <Container $isBottomSheetOpen={isBottomSheetOpen}>
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

const Container = styled.div<{ $isBottomSheetOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[4]};
  padding-bottom: ${({ $isBottomSheetOpen }) =>
    $isBottomSheetOpen ? 'calc(40vh + 64px)' : '64px'};
  width: 100%;
`;
