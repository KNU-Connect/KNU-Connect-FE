import styled from '@emotion/styled';
import { mockChatRooms } from '@/data/mockChat';
import { ChatHeader, ChatList } from './components';

const ChatPage = () => {
  return (
    <Container>
      <ChatHeader title='채팅' />
      <ChatList rooms={mockChatRooms} />
    </Container>
  );
};

export default ChatPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
