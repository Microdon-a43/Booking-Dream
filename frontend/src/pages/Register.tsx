import { useForm } from 'react-hook-form';

type RegisterFormData = {
  firstName: string;
  email: string;
  lastName: string;
  password: string;
  cf_password: string;
};

export const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData): void => {
    console.log(data);
  };
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className=" flex flex-col md:flex-row gap-5">
        <label
          className="text-gray-600 text-sm font-bold flex-1"
          htmlFor="firstName"
        >
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            id="firstName"
            {...register('firstName', { required: 'This filed is required' })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label
          className="text-gray-600 text-sm font-bold flex-1"
          htmlFor="lastName"
        >
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            id="lastName"
            {...register('lastName', { required: 'This filed is required' })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      <label
        className="text-gray-600 text-sm font-bold flex-1"
        htmlFor="cf_password"
      >
        Confirm Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="password"
          id="cf_password"
          {...register('cf_password', {
            required: 'This filed is required',
            validate: (val) => {
              if (!val) {
                return 'This field is required';
              } else if (watch('password') !== val) {
                return 'Your passwords do not match';
              }
            }
          })}
        />
        {errors.cf_password && (
          <span className="text-red-500">{errors.cf_password.message}</span>
        )}
      </label>
      <span>
        <button className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 text-xl">
          Create Account
        </button>
      </span>
    </form>
  );
};
