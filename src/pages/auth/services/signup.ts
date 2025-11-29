import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { type SignUpSchemaType } from '../hooks/signUpSchema';

export interface SignupRequestBody {
  name: string;
  email: string;
  password: string;
  status: string;
  department: string;
  career: string;
  mbti: string;
  interest: string;
  mentor: boolean;
}

export interface SignupResponseBody {}

const MBTI_NONE_LABEL = '모름';

const mapMbtiToBackend = (mbti: string) => {
  if (mbti === MBTI_NONE_LABEL) {
    return 'NONE';
  }
  return mbti;
};

export async function signup(requestBody: SignupRequestBody) {
  const { data: response } = await axiosInstance.post<SignupResponseBody>(
    '/auth/signup',
    requestBody,
  );

  return response;
}

export function useSignup() {
  return useMutation({
    mutationFn: (requestBody: SignUpSchemaType) => {
      const signupData: SignupRequestBody = {
        name: requestBody.name,
        email: requestBody.email,
        password: requestBody.password,
        status: requestBody.status,
        department: requestBody.department,
        career: requestBody.career,
        mbti: mapMbtiToBackend(requestBody.mbti),
        interest: requestBody.interest,
        mentor: requestBody.isMentor,
      };
      return signup(signupData);
    },
  });
}
