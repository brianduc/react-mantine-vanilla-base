import useLogin from '@/infrastructure/api/hooks/auth/useLogin';
import { Button } from '@/infrastructure/common/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/infrastructure/common/ui/form';
import { Input } from '@/infrastructure/common/ui/input';
import { AppRoutes } from '@/infrastructure/core/appRoutes';
import { Constants } from '@/infrastructure/core/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

// Define validation schema using Zod
const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  // React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { mutate: loginRequest, isPending } = useLogin({
    onSuccess: (data) => {
      localStorage.setItem(Constants.API_TOKEN_KEY, data.accessToken);
      localStorage.setItem(Constants.API_REFRESH_TOKEN_KEY, data.refreshToken);
      localStorage.setItem(Constants.API_ROLE, 'ADMIN');
      navigate(AppRoutes.PRIVATE.DASHBOARD, { replace: true });
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    loginRequest(values);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-1/3 p-6 shadow-lg rounded-lg border'>
        <h1 className='text-2xl font-bold text-center uppercase mb-6'>Login into system</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your username' {...field} autoFocus />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='Enter your password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full' disabled={isPending}>
              {isPending ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
