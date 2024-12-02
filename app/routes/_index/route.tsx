import { AppRoutes } from '@/infrastructure/core/appRoutes';
import { Constants } from '@/infrastructure/core/constants';
import { Navigate } from 'react-router';

export function meta() {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function IndexPage() {
  const authWrapper = () => {
    const accessToken = localStorage.getItem(Constants.API_TOKEN_KEY);
    if (accessToken) {
      return <Navigate to={AppRoutes.PRIVATE.DASHBOARD} replace={true} />;
    } else {
      return <Navigate to={AppRoutes.PUBLIC.AUTH.LOGIN} replace={true} />;
    }
  };
  return <>{authWrapper()}</>;
}
