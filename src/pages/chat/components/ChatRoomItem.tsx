import styled from '@emotion/styled';
import type { ChatRoom } from '@/types/chat';
import { User } from 'lucide-react';
import { useRef } from 'react';

type ChatRoomItemProps = {
  room: ChatRoom;
  onLongPress?: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
};

export const ChatRoomItem = ({
  room,
  onLongPress,
  onContextMenu,
}: ChatRoomItemProps) => {
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseDown = () => {
    longPressTimer.current = setTimeout(() => {
      if (onLongPress) {
        onLongPress();
      }
    }, 500);
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onContextMenu) {
      onContextMenu(e);
    }
  };

  return (
    <ChatItem
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleContextMenu}
    >
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
      <RightSection
        hasBadge={room.unreadCount != null && Number(room.unreadCount) > 0}
      >
        <Date>{room.lastMessageDate}</Date>
        {room.unreadCount != null && Number(room.unreadCount) > 0 && (
          <UnreadBadge>{room.unreadCount}</UnreadBadge>
        )}
      </RightSection>
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
  min-height: 48px;
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

type RightSectionProps = {
  hasBadge: boolean;
};

const RightSection = styled.div<RightSectionProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing[2]};
  flex-shrink: 0;
  align-self: stretch;
  justify-content: ${({ hasBadge }) => (hasBadge ? 'center' : 'flex-start')};
`;

const Date = styled.div`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: ${({ theme }) => theme.colors.text.sub};
`;

const UnreadBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.white};
  border-radius: 10px;
  font-size: ${({ theme }) => theme.typography.body3.fontSize};
  line-height: ${({ theme }) => theme.typography.body3.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;
