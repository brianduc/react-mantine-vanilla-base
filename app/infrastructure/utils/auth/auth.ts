import { AppRoutes } from '@/infrastructure/core/appRoutes';
import { Constants } from '@/infrastructure/core/constants';
import { useNavigate } from 'react-router';

export const useLogout = () => {
  const navigate = useNavigate();

  return () => {
    localStorage.removeItem(Constants.API_TOKEN_KEY);
    localStorage.removeItem(Constants.API_REFRESH_TOKEN_KEY);

    // Redirect to the login page and replace the history entry
    navigate(AppRoutes.PUBLIC.AUTH.LOGIN, { replace: true });
  };
};
