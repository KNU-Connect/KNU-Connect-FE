import type { GetNetworkingListParams } from '@/pages/home/services/networking';

export const networkingQueryKeys = {
  all: ['networking'] as const,
  lists: () => [...networkingQueryKeys.all, 'list'] as const,
  list: (
    params?: Omit<GetNetworkingListParams, 'pageable'> & {
      pageable?: { size?: number; sort?: string[] };
    },
  ) => [...networkingQueryKeys.lists(), params] as const,
  detail: (id: number) => [...networkingQueryKeys.all, 'detail', id] as const,
};

export const chatQueryKeys = {
  all: ['chat'] as const,
  rooms: () => [...chatQueryKeys.all, 'rooms'] as const,
  messages: (chatRoomId: number) =>
    [...chatQueryKeys.all, 'messages', chatRoomId] as const,
};
