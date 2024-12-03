import { LoginRequest } from '@/infrastructure/api/requests/auth/LoginRequest';
import { LoginResponse } from '@/infrastructure/api/responses/auth/LoginResponse';
import { usePostApi } from '@/infrastructure/common/api/hooks/requestCommonHooks';
import { Endpoints } from '@/infrastructure/core/endpoints';
import { MutationOptions } from '@tanstack/react-query';

const useLogin = (options?: MutationOptions<LoginResponse, unknown, LoginRequest, unknown>) => {
  return usePostApi<LoginRequest, LoginResponse>({
    endpoint: Endpoints.Auth.LOGIN,
    options,
  });
};

export default useLogin;
