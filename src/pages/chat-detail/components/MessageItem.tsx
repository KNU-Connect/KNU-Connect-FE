import styled from '@emotion/styled';
import { User } from 'lucide-react';
import type { ChatMessage } from '@/types/chat';

type MessageItemProps = {
  message: ChatMessage;
  isCurrentUser: boolean;
  showProfile: boolean;
  showDate: boolean;
  formatTime: (timestamp: string) => string;
};

export const MessageItem = ({
  message,
  isCurrentUser,
  showProfile,
  showDate,
  formatTime,
}: MessageItemProps) => {
  return (
    <>
      {showDate && <DateLabel>{message.date}</DateLabel>}
      <MessageWrapper $isCurrentUser={isCurrentUser}>
        {showProfile && (
          <ProfileImage>
            <User size={28} />
          </ProfileImage>
        )}
        {!showProfile && !isCurrentUser && <Spacer />}
        <MessageContent>
          {showProfile && <SenderName>{message.senderName}</SenderName>}
          <MessageRow $isCurrentUser={isCurrentUser}>
            {isCurrentUser ? (
              <>
                <Time>{formatTime(message.timestamp)}</Time>
                <Message $isCurrentUser={isCurrentUser}>
                  {message.content}
                </Message>
              </>
            ) : (
              <>
                <Message $isCurrentUser={isCurrentUser}>
                  {message.content}
                </Message>
                <Time>{formatTime(message.timestamp)}</Time>
              </>
            )}
          </MessageRow>
        </MessageContent>
      </MessageWrapper>
    </>
  );
};

const DateLabel = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: ${({ theme }) => theme.colors.text.sub};
  margin: ${({ theme }) => theme.spacing[4]} 0;
`;

const MessageWrapper = styled.div<{ $isCurrentUser: boolean }>`
  display: flex;
  justify-content: ${({ $isCurrentUser }) =>
    $isCurrentUser ? 'flex-end' : 'flex-start'};
  width: 100%;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const ProfileImage = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray[30]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.sub};
  flex-shrink: 0;
`;

const Spacer = styled.div`
  width: 50px;
  flex-shrink: 0;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  max-width: 70%;
`;

const SenderName = styled.div`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
  padding-left: ${({ theme }) => theme.spacing[1]};
`;

const MessageRow = styled.div<{ $isCurrentUser: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing[2]};
  flex-direction: row;
  justify-content: ${({ $isCurrentUser }) =>
    $isCurrentUser ? 'flex-end' : 'flex-start'};
`;

const Message = styled.div<{ $isCurrentUser: boolean }>`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
  word-break: break-word;
  overflow-wrap: break-word;

  background-color: ${({ $isCurrentUser, theme }) =>
    $isCurrentUser ? theme.colors.chat.user : theme.colors.chat.other};
  border: ${({ $isCurrentUser, theme }) =>
    $isCurrentUser ? 'none' : `1px solid ${theme.colors.gray[40]}`};
`;

const Time = styled.div`
  font-size: ${({ theme }) => theme.typography.body3.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: ${({ theme }) => theme.colors.text.sub};
  flex-shrink: 0;
  white-space: nowrap;
`;
