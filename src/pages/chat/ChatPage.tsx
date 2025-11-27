import styled from '@emotion/styled';
import { useState } from 'react';
import { mockChatRooms } from '@/data/mockChat';
import { ChatHeader, ChatList, LeaveChatModal } from './components';

const ChatPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

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
      // TODO: 채팅방 나가기 API 호출
      console.log('Leave chat room:', selectedRoomId);
      // mockChatRooms에서 해당 room 제거하는 로직은 실제 API 연동 시 구현
    }
  };

  return (
    <Container>
      <ChatHeader title='채팅' />
      <ChatList
        rooms={mockChatRooms}
        onRoomLongPress={handleRoomLongPress}
        onRoomContextMenu={handleRoomContextMenu}
      />
      <LeaveChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLeaveChat}
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
