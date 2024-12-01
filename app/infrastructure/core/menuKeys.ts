import { MenuItem } from '@/infrastructure/common/components/layout/menuItems';
import { AppRoutes } from '@/infrastructure/core/appRoutes';
import { IconHome2, IconUser, IconUserFilled } from '@tabler/icons-react';

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
    ],
  },
];
