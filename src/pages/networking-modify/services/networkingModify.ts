import axiosInstance from '@/api/axiosInstance';
import { API_ENDPOINTS } from '@/constants';

export interface UpdateNetworkingRequestBody {
  title: string;
  contents: string;
  maxNumber: number;
  representativeId: number;
}

/**
 * 네트워킹 게시물 수정
 * PUT /api/networking/{networking_id}
 */
export async function updateNetworking(
  networkingId: number,
  requestBody: UpdateNetworkingRequestBody,
): Promise<void> {
  await axiosInstance.put(
    API_ENDPOINTS.NETWORKING_DETAIL(networkingId),
    requestBody,
  );
}
