import axiosInstance from '@/api/axiosInstance';
import { API_ENDPOINTS } from '@/constants';
import type { ChatParticipant } from '@/types/chat';

export interface CreateNetworkingRequestBody {
  title: string;
  contents: string;
  maxNumber: number;
  representativeId: number;
}

export interface CreateNetworkingResponseBody {
  id: number;
  title: string;
  contents: string;
  maxNumber: number;
  representativeId: number;
}

export interface CreateNetworkingParams {
  requestBody: CreateNetworkingRequestBody;
  chatRoomId?: number;
}

export async function createNetworking({
  requestBody,
  chatRoomId,
}: CreateNetworkingParams): Promise<CreateNetworkingResponseBody> {
  const { data } = await axiosInstance.post<CreateNetworkingResponseBody>(
    API_ENDPOINTS.NETWORKING,
    requestBody,
    {
      params: chatRoomId ? { chat_room_id: chatRoomId } : undefined,
    },
  );

  return data;
}

/**
 * 채팅방 참여자 목록 조회
 * GET /api/chat-rooms/{chat_room_id}/participants
 */
export async function getChatRoomParticipants(
  chatRoomId: number,
): Promise<ChatParticipant[]> {
  const { data } = await axiosInstance.get<ChatParticipant[]>(
    API_ENDPOINTS.CHAT_ROOM_PARTICIPANTS(chatRoomId),
  );

  return data;
}
