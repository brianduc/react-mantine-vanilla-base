import { LoginRequest } from '@/infrastructure/api/requests/auth/LoginRequest';
import { LoginResponse } from '@/infrastructure/api/responses/auth/LoginResponse';
import useAxios from '@/infrastructure/core/libs/axios/hooks/useAxios';
import { MutationOptions, useMutation } from '@tanstack/react-query';

const useLogin = (options: MutationOptions<LoginResponse, any, LoginRequest, any> = {}) => {
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await axiosInstance.post<LoginResponse>(
        'https://dummyjson.com/auth/login',
        credentials
      );
      return response.data;
    },
    ...options,
  });
};

export default useLogin;
