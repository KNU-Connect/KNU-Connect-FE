import { useMutation } from '@tanstack/react-query';
import {
  createNetworking,
  type CreateNetworkingParams,
} from '../services/networking';

export function useCreateNetworking() {
  return useMutation({
    mutationFn: (params: CreateNetworkingParams) => createNetworking(params),
  });
}
