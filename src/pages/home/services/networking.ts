import axiosInstance from '@/api/axiosInstance';
import type { NetworkingPost } from '@/types/networking';

export interface NetworkingBoard {
  id: number;
  title: string;
  contents: string;
  curNumber: number;
  maxNumber: number;
  createdAt: string;
}

export interface Pageable {
  page?: number;
  size?: number;
  sort?: string[];
}

export interface GetNetworkingListParams {
  keyword?: string;
  pageable?: Pageable;
}

export interface GetNetworkingListResponse {
  boards: NetworkingBoard[];
  page: number;
  size: number;
  hasNext: boolean;
}

export async function getNetworkingList(
  params?: GetNetworkingListParams,
): Promise<GetNetworkingListResponse> {
  const { data } = await axiosInstance.get<GetNetworkingListResponse>(
    '/networking',
    {
      params: {
        keyword: params?.keyword,
        pageable: {
          page: params?.pageable?.page ?? 0,
          size: params?.pageable?.size ?? 10,
          sort: params?.pageable?.sort,
        },
      },
    },
  );

  return data;
}

/**
 * API 응답을 NetworkingPost 타입으로 변환
 * representative 정보는 상세 페이지에서 가져와야 하므로 임시로 빈 값 사용
 */
export function convertBoardToPost(board: NetworkingBoard): NetworkingPost {
  const date = new Date(board.createdAt);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return {
    id: board.id,
    title: board.title,
    description: board.contents,
    currentParticipants: board.curNumber,
    maxParticipants: board.maxNumber,
    date: `${month}/${day}`,
    representative: {
      name: '',
      affiliation: '',
      tags: [],
      bio: '',
    },
  };
}
