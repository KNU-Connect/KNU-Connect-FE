import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { useAuthStore } from '@/store/authStore';

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponseBody {
  token: string;
}

export async function login(requestBody: LoginRequestBody) {
  const { data: response } = await axiosInstance.post<LoginResponseBody>(
    '/auth/login',
    requestBody,
  );

  return response;
}

export function useLogin() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: (requestBody: LoginRequestBody) => login(requestBody),
    onSuccess: (data) => {
      setAccessToken(data.token);
    },
  });
}
