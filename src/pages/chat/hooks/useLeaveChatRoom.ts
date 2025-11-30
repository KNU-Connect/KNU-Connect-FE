import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leaveChatRoom } from '../services/chat';
import { chatQueryKeys } from '@/constants/queryKeys';

export function useLeaveChatRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chatRoomId: number) => leaveChatRoom(chatRoomId),
    onSuccess: () => {
      // 탈퇴 성공 시 채팅 리스트 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.rooms() });
    },
  });
}
