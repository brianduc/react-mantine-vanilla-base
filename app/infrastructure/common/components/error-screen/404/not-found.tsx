import { Button } from '@/infrastructure/common/ui/button';
import { Card, CardContent } from '@/infrastructure/common/ui/card';
import { Ghost } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center bg-gray-50'>
      <Card className='w-full max-w-md mx-4'>
        <CardContent className='pt-6 text-center'>
          <div className='flex justify-center mb-4'>
            <Ghost className='h-24 w-24 text-gray-400' />
          </div>

          <h1 className='text-4xl font-bold mb-2'>404</h1>
          <h2 className='text-2xl font-semibold text-gray-700 mb-4'>Page Not Found</h2>

          <p className='text-gray-500 mb-8'>
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              onClick={() => window.history.back()}
              variant='outline'
              className='w-full sm:w-auto'
            >
              Go Back
            </Button>

            <Button onClick={() => (window.location.href = '/')} className='w-full sm:w-auto'>
              Return Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;
