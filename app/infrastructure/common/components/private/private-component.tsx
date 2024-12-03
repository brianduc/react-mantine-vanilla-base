import { getAccountRole } from '@/infrastructure/utils/auth/auth';
import { ReactNode } from 'react';

interface PrivateComponentProps {
  children: ReactNode;
  roles: string[];
}

const PrivateComponent = ({ children, roles }: PrivateComponentProps) => {
  const role = getAccountRole();
  if (!roles.includes(role!)) {
    return null;
  }
  return <>{children}</>;
};

export default PrivateComponent;
