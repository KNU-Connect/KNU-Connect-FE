import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';

export interface EmailSendRequestBody {
  email: string;
}

export interface EmailSendResponseBody {
  success: boolean;
  message: string;
}

export interface EmailVerifyRequestBody {
  email: string;
  verificationCode: string;
}

export interface EmailVerifyResponseBody {
  success: boolean;
  message: string;
}

export async function sendVerificationCode(requestBody: EmailSendRequestBody) {
  const { data: response } = await axiosInstance.post<EmailSendResponseBody>(
    '/auth/email/send',
    requestBody,
  );

  return response;
}

export async function verifyVerificationCode(
  requestBody: EmailVerifyRequestBody,
) {
  const { data: response } = await axiosInstance.post<EmailVerifyResponseBody>(
    '/auth/email/verify',
    requestBody,
  );

  return response;
}

export function useSendVerificationCode() {
  return useMutation({
    mutationFn: (requestBody: EmailSendRequestBody) =>
      sendVerificationCode(requestBody),
  });
}

export function useVerifyVerificationCode() {
  return useMutation({
    mutationFn: (requestBody: EmailVerifyRequestBody) =>
      verifyVerificationCode(requestBody),
  });
}
