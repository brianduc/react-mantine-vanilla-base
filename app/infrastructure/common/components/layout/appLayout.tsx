import MenuItemsRenderer from '@/infrastructure/common/components/layout/menu/menuItems';
import { menuKeys } from '@/infrastructure/core/menuKeys';
import { useLogout } from '@/infrastructure/utils/auth/auth';
import { ActionIcon, AppShell, Box, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBrandMantine, IconLogout } from '@tabler/icons-react';
import { ReactNode } from 'react';
import MenuCollapsed from './menu/menu-collapsed';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const makeLogout = useLogout();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: desktopOpened ? 300 : 80, // Full width (300px) when expanded, collapsed (80px) when closed
        breakpoint: 'sm',
      }}
      padding='md'
    >
      {/* Header Section */}
      <AppShell.Header>
        <Group h='100%' px='md' className='justify-between items-center'>
          <Group>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom='sm' size='sm' />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom='sm' size='sm' />
            <IconBrandMantine size={30} />
          </Group>
          <Box>
            <ActionIcon variant='subtle' radius='xl' size='xl' onClick={makeLogout}>
              <IconLogout stroke={1.5} />
            </ActionIcon>
          </Box>
        </Group>
      </AppShell.Header>

      {/* Navbar Section */}
      <AppShell.Navbar
        p={'md'}
        style={{
          transition: 'width 0.3s', // Smooth transition for collapsing
          overflow: 'hidden',
        }}
      >
        {desktopOpened ? (
          // Full Menu with Icons and Text
          <MenuItemsRenderer items={menuKeys} userRoles={[]} />
        ) : (
          // Collapsed Menu with Only Icons
          <MenuCollapsed items={menuKeys} userRoles={[]} />
        )}
      </AppShell.Navbar>

      {/* Main Section */}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
