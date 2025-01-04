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
import '@/index.css';
// NOTE: Do not change the order of the imports above, especially the Mantine css imports. Doing so will break the styling of the app.

import type { Route } from './+types/root';

import stylesheet from '@/index.css?url';
import NotFoundPage from '@/infrastructure/common/components/error-screen/404/not-found';
import { GeneralError } from '@/infrastructure/common/components/error-screen/general/general-error';
import AppLayout from '@/infrastructure/common/components/layout/appLayout';
import { Toaster } from '@/infrastructure/common/ui/toaster';
import { AppRoutes } from '@/infrastructure/core/appRoutes';
import { Constants } from '@/infrastructure/core/constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Loader2 } from 'lucide-react';

const queryClient = new QueryClient();

export const clientLoader = async () => {
  const token = localStorage.getItem(Constants.API_TOKEN_KEY);
  return { isLoggedIn: !!token };
};

export function HydrateFallback() {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <Loader2 className='h-16 w-16 animate-spin text-primary' />
    </div>
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
  // {
  //   rel: 'icon',
  //   href: '/favicon.ico',
  //   type: 'image/x-icon',
  // },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
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
      navigate(AppRoutes.ROOT, { replace: true });
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
  let errorPage = null;
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        errorPage = <NotFoundPage />;
        break;
      case 403:
      default:
        errorPage = <GeneralError />;
        break;
    }
  }

  return <main>{errorPage}</main>;
}
