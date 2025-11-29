import axiosInstance from '@/api/axiosInstance';
import { API_ENDPOINTS } from '@/constants';

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
