import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import type { ChatRoom } from '@/types/chat';
import { ROUTES } from '@/routes';
import { ChatRoomItem } from './ChatRoomItem';

type ChatListProps = {
  rooms: ChatRoom[];
  onRoomLongPress?: (roomId: number) => void;
  onRoomContextMenu?: (roomId: number, e: React.MouseEvent) => void;
};

export const ChatList = ({
  rooms,
  onRoomLongPress,
  onRoomContextMenu,
}: ChatListProps) => {
  return (
    <Container>
      {rooms.map((room) => (
        <LinkWrapper
          key={room.id}
          to={ROUTES.CHAT_DETAIL.replace(':id', room.id.toString())}
        >
          <ChatRoomItem
            room={room}
            onLongPress={() => onRoomLongPress?.(room.id)}
            onContextMenu={(e) => onRoomContextMenu?.(room.id, e)}
          />
        </LinkWrapper>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  overflow-y: auto;
`;

const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
