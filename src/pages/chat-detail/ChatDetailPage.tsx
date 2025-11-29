import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import {
  ChatDetailHeader,
  MessageList,
  ChatInput,
  BottomSheet,
} from './components';
import { useChatMessages } from './hooks/useChatMessages';
import { convertMessageResponseToMessage } from './services/chat';
import { useChatRoomList } from '@/pages/chat/hooks/useChatRoomList';

const ChatDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const chatRoomId = id ? Number(id) : 0;
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useChatMessages(chatRoomId);

  // 채팅방 이름 가져오기
  const { data: chatRoomsData } = useChatRoomList();
  const chatRoom = chatRoomsData?.chat_rooms.find(
    (room) => room.id === chatRoomId,
  );
  const chatRoomName = chatRoom?.title || '채팅방';

  // 현재 사용자 ID 가져오기 (임시로 쿼리에서 가져오거나, 추후 인증 정보에서 가져올 수 있음)
  const currentUserId = data?.pages[0]?.user_id?.toString() || '';

  // 메시지 목록 변환 (오래된 메시지부터 최신 순으로 표시)
  // API는 cursor가 null일 때 최신 메시지부터 반환하므로, 전체를 역순으로 정렬
  const messages =
    data?.pages
      .flatMap((page) =>
        page.messages.map((msg) =>
          convertMessageResponseToMessage(msg, page.user_id),
        ),
      )
      .reverse() ?? [];

  // 무한 스크롤을 위한 ref
  const messageListRef = useRef<HTMLDivElement>(null);
  const observerTargetRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver로 무한 스크롤 구현
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !isLoading
        ) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTargetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  const handleNetworkPostClick = () => {
    if (id) {
      navigate(ROUTES.NETWORKING_CREATE.replace(':chatId', id));
    }
    setIsBottomSheetOpen(false);
  };

  if (isLoading && !data) {
    return (
      <Container>
        <LoadingMessage>로딩 중...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>채팅방을 찾을 수 없습니다.</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <ChatDetailHeader name={chatRoomName} />
      <MessageListContainer ref={messageListRef}>
        {isFetchingNextPage && (
          <LoadingText>이전 메시지 불러오는 중...</LoadingText>
        )}
        <ObserverTarget ref={observerTargetRef} />
        <MessageList
          messages={messages}
          currentUserId={currentUserId}
          isBottomSheetOpen={isBottomSheetOpen}
        />
      </MessageListContainer>
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

const MessageListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  position: relative;
`;

const ObserverTarget = styled.div`
  height: 20px;
  width: 100%;
`;

const LoadingText = styled.div`
  padding: ${({ theme }) => theme.spacing[2]};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.sub};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
`;

const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[10]};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  color: ${({ theme }) => theme.colors.text.sub};
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[10]};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  color: ${({ theme }) => theme.colors.text.sub};
`;
