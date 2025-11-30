import axiosInstance from '@/api/axiosInstance';
import { API_ENDPOINTS } from '@/constants';

export type NetworkingParticipantsList = {
  participants: NetworkingParticipant[];
};

export type NetworkingParticipant = {
  id: number;
  name: string;
  department: string;
  career: string;
  status: string;
  interest: string;
  mbti: string;
  introduction?: string | null;
};

/**
 *   참여자 목록 조회
 * GET /api/networking/{networking_id}/participants
 */
export async function getNetworkingParticipantsList(
  networkingId: number,
): Promise<NetworkingParticipantsList> {
  const { data } = await axiosInstance.get<NetworkingParticipantsList>(
    API_ENDPOINTS.NETWORKING_PARTICIPATION_LIST(networkingId),
  );

  return data;
}
