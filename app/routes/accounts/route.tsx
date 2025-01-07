// export const clientLoader = async () => {
//   return protectRoute(["USER"]);
// };

export const meta = () => {
  return [{ title: 'Accounts' }, { name: 'description', content: 'Welcome to Accounts!' }];
};

const Accounts = () => {
  return <div>Account</div>;
};

export default Accounts;
