import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  getUserInfo,
  updateUserInfo,
  type UserUpdateRequest,
} from '../services/user';
import { userQueryKeys } from '@/constants/queryKeys';

export function useUserProfile() {
  return useSuspenseQuery({
    queryKey: userQueryKeys.profile(),
    queryFn: getUserInfo,
  });
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestBody: UserUpdateRequest) => updateUserInfo(requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.profile(),
      });
    },
  });
}
