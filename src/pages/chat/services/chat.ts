import axiosInstance from '@/api/axiosInstance';
import { API_ENDPOINTS } from '@/constants';
import type { ChatRoom } from '@/types/chat';

export interface ChatRoomResponse {
  id: number;
  title: string;
  unread_count: number;
  recent_message: string;
  recent_date: string;
}

export interface GetChatRoomListResponse {
  chat_rooms: ChatRoomResponse[];
}

export async function getChatRoomList(): Promise<GetChatRoomListResponse> {
  const { data } = await axiosInstance.get<GetChatRoomListResponse>(
    API_ENDPOINTS.CHAT_ROOMS,
  );

  return data;
}

/**
 * API 응답을 ChatRoom 타입으로 변환
 */
export function convertChatRoomResponseToRoom(
  room: ChatRoomResponse,
): ChatRoom {
  const date = new Date(room.recent_date);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // title을 기반으로 type 추론 (일단 기본값으로 'individual' 사용)
  // 실제로는 API에서 type을 제공하거나, title 형식으로 구분해야 할 수 있음
  const type: 'individual' | 'group' = 'individual';

  // title을 participants로 사용 (실제로는 API에서 participants를 제공해야 함)
  const participants = [room.title];

  return {
    id: room.id,
    type,
    participants,
    lastMessage: room.recent_message,
    lastMessageDate: `${month}/${day}`,
    unreadCount: room.unread_count,
  };
}

export async function leaveChatRoom(chatRoomId: number): Promise<void> {
  await axiosInstance.delete(API_ENDPOINTS.LEAVE_CHAT_ROOM(chatRoomId));
}
