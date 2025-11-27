import styled from '@emotion/styled';
import type { ChatRoom } from '@/types/chat';
import { User } from 'lucide-react';

type ChatRoomItemProps = {
  room: ChatRoom;
};

export const ChatRoomItem = ({ room }: ChatRoomItemProps) => {
  return (
    <ChatItem>
      <ProfileImage>
        <User size={28} />
      </ProfileImage>
      <ChatInfo>
        <ChatName>
          {room.type === 'group'
            ? room.participants.join(', ')
            : room.participants[0]}
        </ChatName>
        <LastMessage>{room.lastMessage}</LastMessage>
      </ChatInfo>
      <Date>{room.lastMessageDate}</Date>
    </ChatItem>
  );
};

const ChatItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[30]};
  gap: ${({ theme }) => theme.spacing[4]};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[20]};
  }
  &:last-child {
    border-bottom: none;
  }
`;

const ProfileImage = styled.div`
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray[30]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.sub};
  flex-shrink: 0;
`;

const ChatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  flex: 1;
  min-width: 0;
`;

const ChatName = styled.div`
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
`;

const LastMessage = styled.div`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
`;

const Date = styled.div`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: ${({ theme }) => theme.colors.text.sub};
  flex-shrink: 0;
`;
