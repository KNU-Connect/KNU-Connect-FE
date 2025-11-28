import { useQuery } from '@tanstack/react-query';
import { getNetworkingDetail } from '../services/networking';
import { networkingQueryKeys } from '@/constants/queryKeys';

export function useNetworkingDetail(networkingId: number) {
  return useQuery({
    queryKey: networkingQueryKeys.detail(networkingId),
    queryFn: () => getNetworkingDetail(networkingId),
    enabled: !!networkingId,
  });
}
