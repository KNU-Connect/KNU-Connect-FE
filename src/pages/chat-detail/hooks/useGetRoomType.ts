import { useQuery } from '@tanstack/react-query';
import {
  getChatRoomType,
  type GetChatRoomTypeResponse,
} from '../services/chat';
import { chatQueryKeys } from '@/constants/queryKeys';

export function useGetRoomType(chatRoomId: number) {
  return useQuery<GetChatRoomTypeResponse>({
    queryKey: chatQueryKeys.roomType(chatRoomId),
    queryFn: () => getChatRoomType(chatRoomId),
    enabled: !!chatRoomId,
  });
}
