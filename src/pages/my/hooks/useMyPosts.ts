import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyPosts, type GetMyPostsParams } from '../services/posts';
import { myPostsQueryKeys } from '@/constants/queryKeys';

export function useMyPosts(
  params?: Omit<GetMyPostsParams, 'pageable'> & {
    pageable?: { size?: number; sort?: string[] };
  },
) {
  return useInfiniteQuery({
    queryKey: myPostsQueryKeys.list(params),
    queryFn: ({ pageParam = 0 }) =>
      getMyPosts({
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
