import axiosInstance from '@/api/axiosInstance';

export interface RefreshResponseBody {
  token: string;
}

export async function refreshToken() {
  const { data: response } =
    await axiosInstance.post<RefreshResponseBody>('/auth/refresh');

  return response;
}
