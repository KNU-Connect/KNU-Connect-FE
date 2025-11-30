import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { chatQueryKeys } from '@/constants/queryKeys';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';

export interface CreateChatRoomRequest {
  participant_id: number;
}

export interface CreateChatRoomResponse {
  chat_room_id: number;
}

export function useCreateChatRoom() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: CreateChatRoomRequest) => {
      const { data } = await axiosInstance.post<CreateChatRoomResponse>(
        '/chat-rooms',
        request,
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.rooms() });
      navigate(
        `${ROUTES.CHAT_DETAIL.replace(':id', data.chat_room_id.toString())}`,
      );
    },
  });
}
