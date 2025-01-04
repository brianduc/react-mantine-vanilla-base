import useAxios from '@/infrastructure/core/libs/axios/hooks/useAxios';
import { useToast } from '@/infrastructure/core/libs/hooks/use-toast';
import { buildUrl } from '@/infrastructure/utils/url/url';
import {
  MutationOptions,
  QueryKey,
  QueryOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';

interface UseGetApiProps<TResponse> {
  queryKey: QueryKey;
  endpoint: string;
  urlParams?: Record<string, string | number> | null;
  queryParams?: Record<string, string | number | boolean | undefined> | null;
  options?: QueryOptions<any, any, TResponse> | UseQueryOptions<TResponse>;
}

interface UseMutationApiProps<TRequest, TResponse> {
  endpoint: string;
  queryParams?: Record<string, string | number | boolean | undefined> | null;
  options?: MutationOptions<TResponse, unknown, TRequest, unknown>;
}

interface UseDeleteApiProps {
  endpoint: string; // API endpoint
  urlParams?: Record<string, string | number>;
  queryParams?: Record<string, string | number | boolean | undefined> | null;
  options?: MutationOptions;
}

// GET request hook
export const useGetApi = <TResponse = any>({
  queryKey,
  endpoint,
  urlParams = null,
  queryParams = null,
  options = {},
}: UseGetApiProps<TResponse>) => {
  const { axiosInstance, newAbortSignal } = useAxios();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const signal = newAbortSignal();
      const response = await axiosInstance.get<TResponse>(
        buildUrl(endpoint, urlParams, queryParams),
        {
          signal,
        }
      );
      return response.data;
    },
    ...options,
  });
};

// POST request hook
export const usePostApi = <TRequest = any, TResponse = any>({
  endpoint,
  queryParams = null,
  options = {},
}: UseMutationApiProps<TRequest, TResponse>) => {
  const { axiosInstance, newAbortSignal } = useAxios();
  const { toast } = useToast();
  return useMutation<TResponse, unknown, TRequest, unknown>({
    mutationFn: async (payload: TRequest) => {
      const signal = newAbortSignal();
      const response = await axiosInstance.post<TResponse>(
        buildUrl(endpoint, null, queryParams),
        payload,
        { signal }
      );
      return response.data;
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'An error occurred',
        variant: 'destructive',
      });
      if (options.onError)
        options.onError(error, error.response?.data?.message, error.response?.status);
    },
    ...options,
  });
};

// PUT request hook
export const usePutApi = <TRequest = any, TResponse = any>({
  endpoint,
  queryParams = {},
  options = {},
}: UseMutationApiProps<TRequest, TResponse>) => {
  const { axiosInstance, newAbortSignal } = useAxios();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (payload: TRequest) => {
      const signal = newAbortSignal();
      const response = await axiosInstance.put<TResponse>(
        buildUrl(endpoint, {}, queryParams),
        payload,
        {
          signal,
        }
      );
      return response.data;
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'An error occurred',
        variant: 'destructive',
      });
      if (options.onError)
        options.onError(error, error.response?.data?.message, error.response?.status);
    },
    ...options,
  });
};

// DELETE request hook
export const useDeleteApi = ({
  endpoint,
  urlParams = {},
  queryParams = {},
  options = {},
}: UseDeleteApiProps) => {
  const { axiosInstance, newAbortSignal } = useAxios();
  return useMutation({
    mutationFn: async () => {
      const signal = newAbortSignal();
      const response = await axiosInstance.delete(buildUrl(endpoint, urlParams, queryParams), {
        signal,
      });
      return response.data;
    },
    ...options,
  });
};
