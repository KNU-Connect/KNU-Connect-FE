import { useEffect, useRef, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { socketClient } from '@/api/socketClient';
import type { IMessage } from '@stomp/stompjs';
import type {
  SocketChatMessage,
  SocketError,
  SocketUnreadCount,
  SocketRoomUpdate,
} from '../services/chat';

type UseChatSocketProps = {
  chatRoomId: number;
  onMessageReceived?: (message: SocketChatMessage) => void;
  onErrorReceived?: (error: SocketError) => void;
  onUnreadCountReceived?: (data: SocketUnreadCount) => void;
  onRoomUpdateReceived?: (data: SocketRoomUpdate) => void;
};

export function useChatSocket({
  chatRoomId,
  onMessageReceived,
  onErrorReceived,
  onUnreadCountReceived,
  onRoomUpdateReceived,
}: UseChatSocketProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const handleMessage = useCallback(
    (message: IMessage) => {
      if (onMessageReceived) {
        const parsedBody = JSON.parse(message.body);
        onMessageReceived(parsedBody);
      }
    },
    [onMessageReceived],
  );

  const handleError = useCallback(
    (message: IMessage) => {
      if (onErrorReceived) {
        const parsedBody = JSON.parse(message.body);
        onErrorReceived(parsedBody);
      }
    },
    [onErrorReceived],
  );

  const handleUnreadCount = useCallback(
    (message: IMessage) => {
      if (onUnreadCountReceived) {
        const parsedBody = JSON.parse(message.body);
        onUnreadCountReceived(parsedBody);
      }
    },
    [onUnreadCountReceived],
  );

  const handleRoomUpdate = useCallback(
    (message: IMessage) => {
      if (onRoomUpdateReceived) {
        const parsedBody = JSON.parse(message.body);
        onRoomUpdateReceived(parsedBody);
      }
    },
    [onRoomUpdateReceived],
  );

  useEffect(() => {
    if (!chatRoomId || !accessToken) return;

    // 소켓 연결
    socketClient.connect(accessToken);

    // 구독 설정 및 입장 처리 (소켓이 연결된 후 실행되어야 함)
    // 실제로는 socketClient 내부에서 연결 상태를 체크하고 재시도하거나,
    // 연결 완료 콜백을 활용해야 하지만, 여기서는 간단히 setTimeout으로 지연 처리하거나
    // socketClient를 개선하여 연결 대기 로직을 추가할 수 있음.
    // 현재 구조에서는 connect가 비동기라 바로 구독하면 실패할 수 있음.
    // 개선된 socketClient를 사용한다고 가정.

    const waitForConnection = setInterval(() => {
      if (socketClient.isConnected()) {
        clearInterval(waitForConnection);
        initializeChat();
      }
    }, 100);

    const initializeChat = () => {
      // 1. 채팅방 구독
      socketClient.subscribe(`/topic/chat-rooms/${chatRoomId}`, handleMessage);

      // 2. 에러 구독
      socketClient.subscribe('/user/queue/errors', handleError);

      // 3. 안읽은 메시지 수 구독
      socketClient.subscribe(
        `/user/queue/chat-rooms/${chatRoomId}/unread`,
        handleUnreadCount,
      );

      // 4. 채팅방 업데이트 구독
      socketClient.subscribe(
        `/topic/chat-rooms/${chatRoomId}/updates`,
        handleRoomUpdate,
      );

      // 5. 입장 알림 (Redis 갱신)
      socketClient.publish(`/app/chat-rooms/${chatRoomId}/open`);

      // 6. 1분마다 Refresh (Heartbeat)
      refreshIntervalRef.current = setInterval(() => {
        socketClient.publish(`/app/chat-rooms/${chatRoomId}/refresh`);
      }, 60 * 1000);
    };

    return () => {
      clearInterval(waitForConnection);
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }

      // 퇴장 알림
      if (socketClient.isConnected()) {
        socketClient.publish(`/app/chat-rooms/${chatRoomId}/close`);
      }

      // 소켓 연결 해제 (페이지 이동 시 전체 연결을 끊을지, 구독만 해제할지 결정 필요)
      // 보통 SPA에서는 소켓 연결은 유지하고 구독만 관리하기도 하지만,
      // 요구사항에 "채팅방 사용 종료"가 명시되어 있으므로 disconnect 혹은 close 호출
      socketClient.disconnect();
    };
  }, [
    chatRoomId,
    accessToken,
    handleMessage,
    handleError,
    handleUnreadCount,
    handleRoomUpdate,
  ]);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    socketClient.publish(`/app/chat-rooms/${chatRoomId}/chats`, {
      content,
    });
  };

  return {
    sendMessage,
  };
}
