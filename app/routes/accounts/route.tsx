import { protectRoute } from '@/infrastructure/utils/auth/auth';

export const clientLoader = async () => {
  return protectRoute(['USER']);
};
const Accounts = () => {
  return <div>Account</div>;
};

export default Accounts;
