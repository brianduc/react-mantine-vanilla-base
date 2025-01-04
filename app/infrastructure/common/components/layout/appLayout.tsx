import { ReactNode } from 'react';
interface AppLayoutProps {
  children: ReactNode;
}
const AppLayout = ({ children }: AppLayoutProps) => {
  return <div>{children}</div>;
};

export default AppLayout;
