import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../axiosInstance';

export interface CreateNetworkingRequestBody {
  title: string;
  contents: string;
  maxNumber: number;
  representativeId: number;
}

export interface CreateNetworkingResponseBody {
  id: number;
  title: string;
  contents: string;
  maxNumber: number;
  representativeId: number;
}

export async function createNetworking(requestBody: CreateNetworkingRequestBody) {
  const { data: response } = await axiosInstance.post<CreateNetworkingResponseBody>(
    '/networking',
    requestBody,
  );

  return response;
}

export function useCreateNetworking() {
  return useMutation({
    mutationFn: (requestBody: CreateNetworkingRequestBody) =>
      createNetworking(requestBody),
  });
}

