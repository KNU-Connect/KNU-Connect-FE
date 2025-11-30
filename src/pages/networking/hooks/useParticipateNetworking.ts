import { useMutation, useQueryClient } from '@tanstack/react-query';
import { participateNetworking } from '../services/networking';
import { chatQueryKeys } from '@/constants/queryKeys';

export function useParticipateNetworking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ networkingId }: { networkingId: number }) =>
      participateNetworking(networkingId),
    onSuccess: () => {
      // 참여 성공 시 채팅 리스트 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.rooms() });
    },
  });
}
