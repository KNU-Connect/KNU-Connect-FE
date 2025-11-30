import axiosInstance from '@/api/axiosInstance';

export interface UserInfoResponse {
  id: number;
  name: string;
  status: string;
  department: string;
  career: string;
  mbti: string;
  interest: string;
  mentor: boolean;
  introduction: string;
  detail_introduction: string;
}

export interface UserUpdateRequest {
  department?: string;
  career?: string;
  mbti?: string;
  status?: string;
  interest?: string;
  mentor?: boolean;
  introduction?: string;
  detail_introduction?: string;
}

export async function getUserInfo(): Promise<UserInfoResponse> {
  const { data } = await axiosInstance.get<UserInfoResponse>('/users');
  return data;
}

export async function updateUserInfo(
  requestBody: UserUpdateRequest,
): Promise<void> {
  await axiosInstance.patch('/users', requestBody);
}
