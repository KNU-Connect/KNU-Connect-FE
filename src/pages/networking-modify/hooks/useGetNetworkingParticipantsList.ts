import { networkingQueryKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { getNetworkingParticipantsList } from '../services/getNetworkingParticipantsList';

export const useGetNetworkingParticipantsList = (networkingId: number) => {
  return useQuery({
    queryKey: networkingQueryKeys.participants(networkingId),
    queryFn: () => getNetworkingParticipantsList(networkingId),
  });
};
