import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { mockChatDetails } from '@/data/mockChat';
import { ChatDetailHeader, MessageList, ChatInput } from './components';

const ChatDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const chatDetail = id ? mockChatDetails[Number(id)] : undefined;

  if (!chatDetail) {
    return (
      <Container>
        <ErrorMessage>채팅방을 찾을 수 없습니다.</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <ChatDetailHeader name={chatDetail.participant.name} />
      <MessageList messages={chatDetail.messages} currentUserId='currentUser' />
      <ChatInput />
    </Container>
  );
};

export default ChatDetailPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[10]};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  color: ${({ theme }) => theme.colors.text.sub};
`;
