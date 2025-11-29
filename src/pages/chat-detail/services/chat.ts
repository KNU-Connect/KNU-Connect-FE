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
  currentUserId: number,
): ChatMessage {
  const date = new Date(message.created_at);
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

