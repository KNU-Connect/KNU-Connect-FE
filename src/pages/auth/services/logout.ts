import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/api/axiosInstance';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/routes/paths';

export async function logout() {
  await axiosInstance.delete('/auth/logout');
}

export function useLogout() {
  const navigate = useNavigate();
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAccessToken();
      navigate(ROUTES.LOGIN);
    },
    onError: () => {
      clearAccessToken();
      navigate(ROUTES.LOGIN);
    },
  });
}
