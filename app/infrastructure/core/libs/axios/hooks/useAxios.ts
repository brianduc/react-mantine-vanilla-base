import axiosService from '@/infrastructure/core/libs/axios/services/axios.service';
import { useCallback, useEffect } from 'react';

/**
 * Hook to provide Axios instance with request cancellation support
 */
const useAxios = () => {
  /**
   * Generate a new `AbortSignal` for the current request
   */
  const newAbortSignal = useCallback(() => {
    return axiosService.createAbortSignal();
  }, []);

  /**
   * Cleanup any ongoing requests on component unmount
   */
  useEffect(() => {
    return () => {
      axiosService.cancelRequests(); // Abort any pending requests
    };
  }, []);

  return {
    axiosInstance: axiosService.getAxiosInstance(),
    newAbortSignal,
  };
};

export default useAxios;
