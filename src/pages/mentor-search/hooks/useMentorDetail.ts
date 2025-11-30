import { useQuery } from '@tanstack/react-query';
import { getMentorDetail } from '../services/mentor';
import { mentorQueryKeys } from '@/constants/queryKeys';

export function useMentorDetail(userId: number) {
  return useQuery({
    queryKey: mentorQueryKeys.detail(userId),
    queryFn: () => getMentorDetail(userId),
    enabled: !!userId,
  });
}
