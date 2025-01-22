import { protectRoute } from '@/infrastructure/utils/auth/auth';

export const meta = () => {
  return [{ title: 'Throw Error Page' }];
};

export const clientLoader = async () => {
  return protectRoute(['USER']);
};

const ThrowError = () => {
  return <div>ThrowError</div>;
};

export default ThrowError;
