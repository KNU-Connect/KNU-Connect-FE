import styled from '@emotion/styled';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { ROUTES } from '@/routes/paths';
import { chatQueryKeys } from '@/constants/queryKeys';
import {
  ChatDetailHeader,
  MessageList,
  ChatInput,
  BottomSheet,
} from './components';
import { useChatMessages } from './hooks/useChatMessages';
import { useChatSocket } from './hooks/useChatSocket';
import { convertMessageResponseToMessage } from './services/chat';
import type {
  GetChatMessagesResponse,
  SocketChatMessage,
  SocketError,
} from './services/chat';
import { useChatRoomList } from '@/pages/chat/hooks/useChatRoomList';
import type { GetChatRoomListResponse } from '@/pages/chat/services/chat';
import type { SocketUnreadCount } from './services/chat';

const ChatDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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

  // 소켓 메시지 수신 핸들러
  const handleMessageReceived = useCallback(
    (newMessage: SocketChatMessage) => {
      // 소켓 메시지 포맷을 API 응답 포맷으로 변환
      // (소켓은 createdAt, API는 created_at을 사용)
      // LocalDateTime 형식 (예: "2025-11-29T13:07:22.729684")을 그대로 사용
      // LocalDateTime은 ISO 8601 형식과 호환되므로 new Date()가 파싱 가능
      const formattedCreatedAt =
        newMessage.createdAt || new Date().toISOString();

      queryClient.setQueryData(
        chatQueryKeys.messages(chatRoomId),
        (oldData: InfiniteData<GetChatMessagesResponse> | undefined) => {
          if (!oldData) return oldData;

          // 가장 첫 번째 페이지(최신)에 새 메시지 추가
          const newPages = [...oldData.pages];
          // 새 메시지 형식 변환 (ChatMessageResponse 형태여야 함)
          const chatMessageResponse = {
            message_id: newMessage.message_id,
            sender_id: newMessage.sender_id,
            sender_name: newMessage.sender_name,
            content: newMessage.content,
            created_at: formattedCreatedAt,
          };

          newPages[0] = {
            ...newPages[0],
            messages: [chatMessageResponse, ...newPages[0].messages],
          };

          return {
            ...oldData,
            pages: newPages,
          };
        },
      );
    },
    [chatRoomId, queryClient],
  );

  // 소켓 에러 핸들러
  const handleErrorReceived = useCallback((error: SocketError) => {
    console.error('Socket error:', error);
    // TODO: 에러 토스트 표시 등
  }, []);

  // 안읽은 메시지 수 업데이트 핸들러
  const handleUnreadCountReceived = useCallback(
    (data: SocketUnreadCount) => {
      // 채팅 리스트의 안읽은 메시지 수 업데이트
      queryClient.setQueryData(
        chatQueryKeys.rooms(),
        (oldData: GetChatRoomListResponse | undefined) => {
          if (!oldData) return oldData;

          const updatedRooms = oldData.chat_rooms.map((room) => {
            if (room.id === data.chat_room_id) {
              return {
                ...room,
                unread_count: data.unread_count,
              };
            }
            return room;
          });

          return {
            ...oldData,
            chat_rooms: updatedRooms,
          };
        },
      );
    },
    [queryClient],
  );

  // 소켓 연결
  const { sendMessage } = useChatSocket({
    chatRoomId,
    onMessageReceived: handleMessageReceived,
    onErrorReceived: handleErrorReceived,
    onUnreadCountReceived: handleUnreadCountReceived,
  });

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
  const messages = useMemo(() => {
    return (
      data?.pages
        .flatMap((page) =>
          page.messages.map((msg) =>
            convertMessageResponseToMessage(msg, page.user_id),
          ),
        )
        .reverse() ?? []
    );
  }, [data]);

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

  // 이전 메시지 개수 저장용 ref
  const prevMessagesLength = useRef(messages.length);
  // 메시지 변경 시, 스크롤이 맨 아래에 있을 때만 자동으로 아래로 이동
  useEffect(() => {
    const container = messageListRef.current;
    if (!container) return;

    // 내가 메시지를 보냈을 때(메시지 개수가 늘어남 + 마지막 메시지의 sender가 나)
    const lastMessage = messages[messages.length - 1];
    const isMyMessage =
      lastMessage && String(lastMessage.senderId) === String(currentUserId);

    if (messages.length > prevMessagesLength.current && isMyMessage) {
      container.scrollTop = container.scrollHeight;
    } else {
      // 기존 로직: 스크롤이 맨 아래에 있을 때만 자동 스크롤
      const isAtBottom =
        Math.abs(
          container.scrollHeight - container.scrollTop - container.clientHeight,
        ) < 2;
      if (isAtBottom) {
        container.scrollTop = container.scrollHeight;
      }
    }
    prevMessagesLength.current = messages.length;
  }, [messages, currentUserId]);

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
        onSend={sendMessage}
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
