import { Button } from '@/infrastructure/common/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/infrastructure/common/ui/card';
import { Home, Lock } from 'lucide-react'; // Import Lucide icons
import { Link } from 'react-router';

export default function GeneralError() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <Lock className='mx-auto h-12 w-12 text-red-500' />
          <CardTitle className='text-2xl font-bold mt-4'>403 - Forbidden</CardTitle>
          <CardDescription className='mt-2 text-gray-600'>
            You don't have permission to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent className='text-center'>
          <p className='text-sm text-gray-500'>
            If you believe this is a mistake, please contact the administrator.
          </p>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Link ref='/' to={'/'}>
            <Button variant='default' className='gap-2'>
              <Home className='h-4 w-4' />
              Go Back Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
