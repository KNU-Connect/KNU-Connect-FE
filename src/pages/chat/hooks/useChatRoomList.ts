import { useQuery } from '@tanstack/react-query';
import { chatQueryKeys } from '@/constants/queryKeys';
import { getChatRoomList } from '../services/chat';

export function useChatRoomList() {
  return useQuery({
    queryKey: chatQueryKeys.rooms(),
    queryFn: () => getChatRoomList(),
  });
}
