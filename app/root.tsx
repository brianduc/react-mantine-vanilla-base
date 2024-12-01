import { ReactNode, useEffect } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/charts/styles.css';
import '@/index.css';
import { ColorSchemeScript, LoadingOverlay, MantineProvider } from '@mantine/core';
// NOTE: Do not change the order of the imports above, especially the Mantine css imports. Doing so will break the styling of the app.

import type { Route } from './+types/root';

import stylesheet from '@/index.css?url';
import AppLayout from '@/infrastructure/common/components/layout/appLayout';
import { AppRoutes } from '@/infrastructure/core/appRoutes';
import { Constants } from '@/infrastructure/core/constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export const clientLoader = async () => {
  const token = localStorage.getItem(Constants.API_TOKEN_KEY);
  return { isLoggedIn: !!token };
};

export function HydrateFallback() {
  return (
    <LoadingOverlay
      visible={true}
      zIndex={1000}
      loaderProps={{ type: 'bars' }}
      transitionProps={{
        duration: 500,
        timingFunction: 'ease',
      }}
    />
  );
}

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  { rel: 'stylesheet', href: stylesheet },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <MantineProvider>{children}</MantineProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { isLoggedIn } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem(Constants.API_TOKEN_KEY);

    // Redirect only if the user is not already on the correct page
    if (token && location.pathname === AppRoutes.PUBLIC.AUTH.LOGIN) {
      navigate(AppRoutes.PRIVATE.DASHBOARD, { replace: true });
    } else if (!token && location.pathname !== AppRoutes.PUBLIC.AUTH.LOGIN) {
      navigate(AppRoutes.PUBLIC.AUTH.LOGIN, { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <>
      {isLoggedIn ? (
        <AppLayout>
          <Outlet />
        </AppLayout>
      ) : (
        // Render public routes (e.g., login, register)
        <Outlet />
      )}
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
