import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { socketClient } from '@/api/socketClient';
import { chatQueryKeys } from '@/constants/queryKeys';
import type { IMessage, StompSubscription } from '@stomp/stompjs';
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
    let cleanup: (() => void) | null = null;
    const waitForConnection = setInterval(() => {
      if (socketClient.isConnected()) {
        clearInterval(waitForConnection);

        // 각 채팅방의 안읽은 메시지 수 구독
        const subscriptions: StompSubscription[] = chatRoomIds
          .map((chatRoomId) =>
            socketClient.subscribe(
              `/user/queue/chat-rooms/${chatRoomId}/unread`,
              handleUnreadCount,
            ),
          )
          .filter((s): s is StompSubscription => Boolean(s));

        // 폴백: 소켓이 불안정하거나 누락되는 경우를 대비해 주기적으로 채팅방 목록을 무효화
        const fallbackInterval = setInterval(() => {
          queryClient.invalidateQueries({ queryKey: chatQueryKeys.rooms() });
        }, 5000);

        // cleanup: 구독 해제 및 폴백 중지
        cleanup = () => {
          subscriptions.forEach((sub) => {
            try {
              sub.unsubscribe();
            } catch {
              // ignore
            }
          });
          clearInterval(fallbackInterval);
        };
      }
    }, 100);

    return () => {
      // clear waiting interval
      clearInterval(waitForConnection);
      // call inner cleanup if set
      try {
        if (cleanup) cleanup();
      } catch {
        // ignore
      }
      // Note: 소켓 연결은 앱 전역에서 관리할 수 있으므로 여기서는 disconnect하지 않습니다.
    };
  }, [accessToken, chatRoomIds, handleUnreadCount, queryClient]);
}
