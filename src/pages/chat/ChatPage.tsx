import styled from '@emotion/styled';
import { useState, useMemo } from 'react';
import { ChatHeader, ChatList, LeaveChatModal } from './components';
import { useChatRoomList } from './hooks/useChatRoomList';
import { useChatRoomUnreadCounts } from './hooks/useChatRoomUnreadCounts';
import { convertChatRoomResponseToRoom } from './services/chat';
import { useLeaveChatRoom } from './hooks/useLeaveChatRoom';

const ChatPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const { data, isLoading, error } = useChatRoomList();
  const { mutate: leaveChat, isPending } = useLeaveChatRoom();

  // 채팅방 ID 목록 추출
  const chatRoomIds = useMemo(
    () => data?.chat_rooms.map((room) => room.id) ?? [],
    [data],
  );

  // 안읽은 메시지 수 소켓 구독
  useChatRoomUnreadCounts(chatRoomIds);

  const handleRoomLongPress = (roomId: number) => {
    setSelectedRoomId(roomId);
    setIsModalOpen(true);
  };

  const handleRoomContextMenu = (roomId: number, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedRoomId(roomId);
    setIsModalOpen(true);
  };

  const handleLeaveChat = () => {
    if (selectedRoomId !== null) {
      leaveChat(selectedRoomId, {
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedRoomId(null);
        },
      });
    }
  };

  const rooms = data?.chat_rooms.map(convertChatRoomResponseToRoom) ?? [];

  return (
    <Container>
      <ChatHeader title='채팅' />
      {isLoading && <LoadingText>로딩 중...</LoadingText>}
      {error && (
        <ErrorText>채팅방을 불러오는 중 오류가 발생했습니다.</ErrorText>
      )}
      {!isLoading && !error && (
        <ChatList
          rooms={rooms}
          onRoomLongPress={handleRoomLongPress}
          onRoomContextMenu={handleRoomContextMenu}
        />
      )}
      <LeaveChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLeaveChat}
        isPending={isPending}
      />
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

const LoadingText = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.sub};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
`;

const ErrorText = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
`;
