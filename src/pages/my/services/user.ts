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

const MBTI_NONE_LABEL = '모름';
const MBTI_NONE_BACKEND = 'NONE';

const mapMbtiToBackend = (mbti: string) => {
  if (mbti === MBTI_NONE_LABEL) {
    return MBTI_NONE_BACKEND;
  }
  return mbti;
};

const mapMbtiFromBackend = (mbti: string) => {
  if (mbti === MBTI_NONE_BACKEND) {
    return MBTI_NONE_LABEL;
  }
  return mbti;
};

export async function getUserInfo(): Promise<UserInfoResponse> {
  const { data } = await axiosInstance.get<UserInfoResponse>('/users');
  return {
    ...data,
    mbti: mapMbtiFromBackend(data.mbti),
  };
}

export async function updateUserInfo(
  requestBody: UserUpdateRequest,
): Promise<void> {
  const mappedRequestBody: UserUpdateRequest = {
    ...requestBody,
    mbti: requestBody.mbti ? mapMbtiToBackend(requestBody.mbti) : undefined,
  };
  await axiosInstance.patch('/users', mappedRequestBody);
}
