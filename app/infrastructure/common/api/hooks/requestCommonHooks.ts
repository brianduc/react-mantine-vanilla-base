import useAxios from '@/infrastructure/core/libs/axios/hooks/useAxios';
import { buildUrl } from '@/infrastructure/utils/url/url';
import {
  MutationOptions,
  QueryKey,
  QueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';

interface UseGetApiProps {
  queryKey: QueryKey;
  endpoint: string;
  urlParams?: Record<string, any>;
  options?: QueryOptions;
}

interface UseMutationApiProps {
  endpoint: string;
  options?: MutationOptions;
}

interface UseDeleteApiProps {
  endpoint: string;
  urlParams?: Record<string, any>;
  options?: MutationOptions;
}

// GET request hook
export const useGetApi = ({ queryKey, endpoint, urlParams = {}, options = {} }: UseGetApiProps) => {
  const { axiosInstance, newAbortSignal } = useAxios();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const signal = newAbortSignal(); // Create signal for request cancellation
      const response = await axiosInstance.get(buildUrl(endpoint, urlParams), { signal });
      return response.data;
    },
    ...options,
  });
};

// POST request hook
export const usePostApi = ({ endpoint, options = {} }: UseMutationApiProps) => {
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: any) => {
      const response = await axiosInstance.post(endpoint, payload);
      return response.data;
    },
    ...options,
  });
};

// PUT request hook
export const usePutApi = ({ endpoint, options = {} }: UseMutationApiProps) => {
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: any) => {
      const response = await axiosInstance.put(endpoint, payload);
      return response.data;
    },
    ...options,
  });
};

// DELETE request hook
export const useDeleteApi = ({ endpoint, urlParams = {}, options = {} }: UseDeleteApiProps) => {
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(buildUrl(endpoint, urlParams));
      return response.data;
    },
    ...options,
  });
};
