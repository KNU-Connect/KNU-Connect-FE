import axiosInstance from '@/api/axiosInstance';
import type {
  GetNetworkingListResponse,
  Pageable,
} from '@/pages/home/services/networking';

export interface GetMyPostsParams {
  pageable?: Pageable;
}

export async function getMyPosts(
  params?: GetMyPostsParams,
): Promise<GetNetworkingListResponse> {
  const { data } = await axiosInstance.get<GetNetworkingListResponse>(
    '/networking/me',
    {
      params: {
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
