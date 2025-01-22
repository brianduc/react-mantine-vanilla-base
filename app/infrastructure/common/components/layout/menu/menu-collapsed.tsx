import { ActionIcon, Box, Menu, Tooltip } from '@mantine/core';
import { useNavigate } from 'react-router';
import { MenuItem } from './menuItems';

interface MenuCollapsedProps {
  items: MenuItem[];
  userRoles: string[]; // Current user's roles
}

const MenuCollapsed = ({ items, userRoles }: MenuCollapsedProps) => {
  const navigate = useNavigate();

  const hasAccess = (roles?: string[]) => {
    // If no roles are specified, item is public
    if (!roles) return true;
    // Check if any of the user's roles match the item's roles
    return roles.some((role) => userRoles.includes(role));
  };

  const renderMenuItems = (menuItems: MenuItem[]) => {
    return menuItems
      .filter((item) => hasAccess(item.roles)) // Filter items based on access
      .map((item, index) => {
        return !item.children ? (
          <Tooltip key={index} label={item.label} position='right' withArrow>
            <ActionIcon
              variant={location.pathname === item.path ? 'light' : 'subtle'}
              color={location.pathname === item.path ? 'blue' : 'black'}
              size={'lg'}
              onClick={
                !item.children // Only navigate if there are no children
                  ? () => navigate(item.path)
                  : undefined // Disable navigation for parents
              }
            >
              {item.leftIcon && <item.leftIcon />}
            </ActionIcon>
          </Tooltip>
        ) : (
          <>
            <Menu trigger='hover' key={index} position='right' withArrow width={200}>
              <Menu.Target>
                <ActionIcon
                  key={index}
                  variant={
                    location.pathname === item.path ||
                    item.children.some((child) => child.path === location.pathname)
                      ? 'light'
                      : 'subtle'
                  }
                  color={
                    location.pathname === item.path ||
                    item.children.some((child) => child.path === location.pathname)
                      ? 'blue'
                      : 'black'
                  }
                  size={'lg'}
                  onClick={
                    !item.children // Only navigate if there are no children
                      ? () => navigate(item.path)
                      : undefined // Disable navigation for parents
                  }
                >
                  {item.leftIcon && <item.leftIcon />}
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>{item.label}</Menu.Label>
                {item.children.map((child, index) => (
                  <Menu.Item
                    key={index}
                    leftSection={child.leftIcon && <child.leftIcon size={14} />}
                    onClick={() => navigate(child.path)}
                    bg={
                      location.pathname === child.path
                        ? 'var(--mantine-color-blue-light)'
                        : 'transparent'
                    }
                    color={location.pathname === child.path ? 'blue' : 'black'}
                  >
                    {child.label}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </>
        );
      });
  };

  return (
    <>
      <Box className='flex flex-col items-center gap-y-2'>{renderMenuItems(items)}</Box>
    </>
  );
};

export default MenuCollapsed;
