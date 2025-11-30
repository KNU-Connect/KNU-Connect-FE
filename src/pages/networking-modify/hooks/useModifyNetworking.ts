import { useMutation } from '@tanstack/react-query';
import {
  updateNetworking,
  type UpdateNetworkingRequestBody,
} from '../services/networkingModify';

export type UpdateNetworkingParams = {
  networkingId: number;
  requestBody: UpdateNetworkingRequestBody;
};

export function useModifyNetworking() {
  return useMutation({
    mutationFn: (params: UpdateNetworkingParams) =>
      updateNetworking(params.networkingId, params.requestBody),
  });
}
