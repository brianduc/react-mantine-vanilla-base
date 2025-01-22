import { MenuItem } from '@/infrastructure/common/components/layout/menu/menuItems';
import { AppRoutes } from '@/infrastructure/core/appRoutes';
import { IconError404, IconHome2, IconUser, IconUserFilled } from '@tabler/icons-react';

export const menuKeys: MenuItem[] = [
  {
    label: 'Dashboard',
    leftIcon: IconHome2,
    path: AppRoutes.PRIVATE.DASHBOARD,
  },
  {
    label: 'Account',
    leftIcon: IconUser,
    path: AppRoutes.PRIVATE.ACCOUNTS,
    children: [
      {
        label: 'Users',
        leftIcon: IconUserFilled,
        path: AppRoutes.PRIVATE.USERS,
      },
      {
        label: 'Throw Error Test',
        leftIcon: IconError404,
        path: AppRoutes.PRIVATE.THROW_ERROR,
      },
    ],
  },
];
