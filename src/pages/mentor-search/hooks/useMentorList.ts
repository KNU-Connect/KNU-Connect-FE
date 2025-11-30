import { useInfiniteQuery } from '@tanstack/react-query';
import { getMentorList, type GetMentorListParams } from '../services/mentor';
import { mentorQueryKeys } from '@/constants/queryKeys';

export function useMentorList(
  params?: Omit<GetMentorListParams, 'pageable'> & {
    pageable?: { size?: number; sort?: string[] };
  },
) {
  return useInfiniteQuery({
    queryKey: mentorQueryKeys.list(params),
    queryFn: ({ pageParam = 0 }) =>
      getMentorList({
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
