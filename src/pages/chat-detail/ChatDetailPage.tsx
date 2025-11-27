import styled from '@emotion/styled';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockChatDetails } from '@/data/mockChat';
import {
  ChatDetailHeader,
  MessageList,
  ChatInput,
  BottomSheet,
} from './components';

const ChatDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const chatDetail = id ? mockChatDetails[Number(id)] : undefined;
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  if (!chatDetail) {
    return (
      <Container>
        <ErrorMessage>채팅방을 찾을 수 없습니다.</ErrorMessage>
      </Container>
    );
  }

  const handleNetworkPostClick = () => {
    // TODO: 네트워킹 글 생성 페이지로 이동
    setIsBottomSheetOpen(false);
  };

  return (
    <Container>
      <ChatDetailHeader name={chatDetail.participant.name} />
      <MessageList
        messages={chatDetail.messages}
        currentUserId='currentUser'
        isBottomSheetOpen={isBottomSheetOpen}
      />
      <ChatInput
        isBottomSheetOpen={isBottomSheetOpen}
        onPlusClick={() => setIsBottomSheetOpen(!isBottomSheetOpen)}
      />
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onNetworkPostClick={handleNetworkPostClick}
      />
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
