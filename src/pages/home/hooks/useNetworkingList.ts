import { useInfiniteQuery } from '@tanstack/react-query';
import {
  getNetworkingList,
  type GetNetworkingListParams,
} from '../services/networking';

export function useNetworkingList(
  params?: Omit<GetNetworkingListParams, 'pageable'> & {
    pageable?: { size?: number; sort?: string[] };
  },
) {
  return useInfiniteQuery({
    queryKey: ['networking', 'list', params],
    queryFn: ({ pageParam = 0 }) =>
      getNetworkingList({
        ...params,
        pageable: {
          page: pageParam,
          size: params?.pageable?.size ?? 10,
          sort: params?.pageable?.sort,
        },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
  });
}
