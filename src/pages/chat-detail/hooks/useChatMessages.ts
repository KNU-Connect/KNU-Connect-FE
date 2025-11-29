import { useInfiniteQuery } from '@tanstack/react-query';
import { getChatMessages, type GetChatMessagesParams } from '../services/chat';
import { chatQueryKeys } from '@/constants/queryKeys';

export function useChatMessages(chatRoomId: number, size: number = 20) {
  return useInfiniteQuery({
    queryKey: chatQueryKeys.messages(chatRoomId),
    queryFn: ({ pageParam }: { pageParam: number | null }) =>
      getChatMessages({
        chatRoomId,
        cursor: pageParam,
        size,
      }),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext && lastPage.nextCursor !== null
        ? lastPage.nextCursor
        : undefined;
    },
  });
}

