import { MenuItem } from '@/infrastructure/common/components/layout/menuItems';
import { AppRoutes } from '@/infrastructure/core/appRoutes';

export const menuKeys: MenuItem[] = [
  {
    label: 'Dashboard',
    leftIcon: null,
    path: AppRoutes.PRIVATE.DASHBOARD,
  },
  {
    label: 'Account',
    leftIcon: null,
    path: AppRoutes.PRIVATE.ACCOUNTS,
    children: [
      {
        label: 'Users',
        leftIcon: null,
        path: AppRoutes.PRIVATE.USERS,
      },
    ],
  },
];
