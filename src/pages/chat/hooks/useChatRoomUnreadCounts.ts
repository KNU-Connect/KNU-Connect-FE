import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { socketClient } from '@/api/socketClient';
import { chatQueryKeys } from '@/constants/queryKeys';
import type { IMessage } from '@stomp/stompjs';
import type { SocketUnreadCount } from '@/pages/chat-detail/services/chat';
import type { GetChatRoomListResponse } from '../services/chat';

/**
 * 모든 채팅방의 안읽은 메시지 수를 소켓으로 구독하는 훅
 * 채팅 리스트 페이지에서 사용
 */
export function useChatRoomUnreadCounts(chatRoomIds: number[]) {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((state) => state.accessToken);

  const handleUnreadCount = useCallback(
    (message: IMessage) => {
      const data: SocketUnreadCount = JSON.parse(message.body);

      // React Query 캐시 업데이트
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

  useEffect(() => {
    if (!accessToken || chatRoomIds.length === 0) return;

    // 소켓 연결
    socketClient.connect(accessToken);

    // 연결 대기 후 구독
    const waitForConnection = setInterval(() => {
      if (socketClient.isConnected()) {
        clearInterval(waitForConnection);

        // 각 채팅방의 안읽은 메시지 수 구독
        chatRoomIds.forEach((chatRoomId) => {
          socketClient.subscribe(
            `/user/queue/chat-rooms/${chatRoomId}/unread`,
            handleUnreadCount,
          );
        });
      }
    }, 100);

    return () => {
      clearInterval(waitForConnection);
      // 채팅 리스트 페이지에서는 소켓 연결을 유지하되, 구독만 해제
      // (실제로는 구독 해제 로직이 필요하지만, socketClient에 unsubscribe 메서드가 없으므로
      // 페이지 이탈 시 전체 연결을 끊지 않고 유지하는 것이 일반적)
    };
  }, [accessToken, chatRoomIds, handleUnreadCount]);
}

