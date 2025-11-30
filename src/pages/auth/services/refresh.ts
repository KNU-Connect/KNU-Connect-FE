import axios from 'axios';

export interface RefreshResponseBody {
  token: string;
}

const refreshAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export async function refreshToken() {
  const { data: response } =
    await refreshAxiosInstance.post<RefreshResponseBody>('/auth/refresh');

  return response;
}
