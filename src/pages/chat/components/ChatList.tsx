import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import type { ChatRoom } from '@/types/chat';
import { ROUTES } from '@/routes';
import { ChatRoomItem } from './ChatRoomItem';

type ChatListProps = {
  rooms: ChatRoom[];
};

export const ChatList = ({ rooms }: ChatListProps) => {
  return (
    <Container>
      {rooms.map((room) => (
        <Link
          key={room.id}
          to={ROUTES.CHAT_DETAIL.replace(':id', room.id.toString())}
        >
          <ChatRoomItem room={room} />
        </Link>
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
