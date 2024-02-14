import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api-client';
import { useAppContext } from '../contexts/AppContext';

export type LoginFormData = {
  email: string;
  password: string;
};

export const Login = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>();

  const { error, mutate } = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
      showToast({ message: 'You have been signed in', type: 'success' });
      navigate('/');
    },
    onError: (err: Error) => {
      showToast({ message: err?.message, type: 'error' });
    }
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-gray-600 text-sm font-bold flex-1" htmlFor="email">
        Email
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="email"
          id="email"
          {...register('email', { required: 'This filed is required' })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label
        className="text-gray-600 text-sm font-bold flex-1"
        htmlFor="password"
      >
        Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="password"
          id="password"
          {...register('password', {
            required: 'This filed is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className='flex items-center justify-between'>
        <span className="text-sm ">
          Not registered? <Link className='underline' to="/register"> Create an account here</Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 text-xl"
        >
          Login
        </button>
      </span>
    </form>
  );
};
