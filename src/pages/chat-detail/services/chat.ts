import axiosInstance from '@/api/axiosInstance';
import { API_ENDPOINTS } from '@/constants';
import type { ChatMessage } from '@/types/chat';

export interface ChatMessageResponse {
  message_id: number;
  sender_id: number;
  sender_name: string;
  content: string;
  created_at: string;
}

export interface GetChatMessagesResponse {
  user_id: number;
  messages: ChatMessageResponse[];
  hasNext: boolean;
  nextCursor: number | null;
}

export interface GetChatMessagesParams {
  chatRoomId: number;
  cursor?: number | null;
  size?: number;
}

// WebSocket 페이로드 타입 정의
export interface SocketChatMessage {
  message_id: number;
  sender_id: number;
  sender_name: string;
  content: string;
  createdAt: string; // LocalDateTime
}

export interface SocketError {
  type: string;
  message: string;
  code: string;
}

export interface SocketUnreadCount {
  chat_room_id: number;
  unread_count: number;
}

export interface SocketRoomUpdate {
  deleted_message_id: number;
}

export interface SendMessagePayload {
  content: string;
}

export async function getChatMessages({
  chatRoomId,
  cursor,
  size = 20,
}: GetChatMessagesParams): Promise<GetChatMessagesResponse> {
  const { data } = await axiosInstance.get<GetChatMessagesResponse>(
    API_ENDPOINTS.CHAT_MESSAGES(chatRoomId),
    {
      params: {
        cursor: cursor ?? undefined,
        size,
      },
    },
  );

  return data;
}

/**
 * API 응답을 ChatMessage 타입으로 변환
 */
export function convertMessageResponseToMessage(
  message: ChatMessageResponse,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _currentUserId?: number,
): ChatMessage {
  if (!message.created_at) {
    // created_at이 없으면 현재 시간 사용
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return {
      id: message.message_id,
      senderId: message.sender_id.toString(),
      senderName: message.sender_name,
      content: message.content,
      timestamp: now.toISOString(),
      date: `${year}년 ${month}월 ${day}일`,
    };
  }

  const date = new Date(message.created_at);
  if (isNaN(date.getTime())) {
    // 유효하지 않은 날짜면 현재 시간 사용
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return {
      id: message.message_id,
      senderId: message.sender_id.toString(),
      senderName: message.sender_name,
      content: message.content,
      timestamp: now.toISOString(),
      date: `${year}년 ${month}월 ${day}일`,
    };
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 날짜 구분을 위한 포맷 (YYYY년 M월 D일)
  const dateString = `${year}년 ${month}월 ${day}일`;

  return {
    id: message.message_id,
    senderId: message.sender_id.toString(),
    senderName: message.sender_name,
    content: message.content,
    timestamp: message.created_at,
    date: dateString,
  };
}

