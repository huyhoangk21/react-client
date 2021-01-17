import { useFormik } from 'formik';
import { ReactElement, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from '../api/axios';
import SignupSchema from '../validations/SignupSchema';
import AuthButton from '../components/AuthButton';
import TextField from '../components/TextField';

const Signup = ({ history }: RouteComponentProps): ReactElement => {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: { username: '', email: '', password: '' },
    validationSchema: SignupSchema,
    validateOnBlur: false,
    onSubmit: async ({ username, email, password }) => {
      try {
        await axios.post('/auth/signup', {
          username,
          email,
          password,
        });
        setMessage('Signed up successfully');
        setTimeout(() => history.push('/login'), 2000);
      } catch (error) {
        const errors: string[] = error.response.data.errors;
        setError(errors[Math.floor(Math.random() * errors.length)]);
      }
    },
  });

  const disabledButton =
    isSubmitting ||
    values.username.length === 0 ||
    values.email.length === 0 ||
    values.password.length === 0 ||
    errors.email !== undefined ||
    errors.username !== undefined ||
    errors.password !== undefined;

  return (
    <div className='w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center sm:bg-gray-100'>
      <form
        autoComplete='off'
        onSubmit={handleSubmit}
        className='w-72 sm:bg-gray-50 sm:border sm:border-gray-300 sm:w-96 sm:p-10 sm:pb-12'
      >
        <h1 className='text-4xl text-center font-semibold'>Instagram</h1>
        <h2 className='text-gray-500 mt-4 font-semibold text-center'>
          Sign up to see photos and videos from your friends.
        </h2>
        <TextField
          id='username'
          type='text'
          name='username'
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className='mb-0.5'
        />
        <TextField
          id='email'
          type='email'
          name='email'
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className='mb-0.5'
        />
        <TextField
          id='password'
          type='password'
          name='password'
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <p className='text-red-500 mt-3 text-center text-sm'>
          {errors.username || errors.email || errors.password || error}
        </p>
        <p className='text-green-500 mt-3 text-center text-sm'>{message}</p>
        {message && (
          <p className='text-green-500 mt-3 text-center text-sm'>
            Redirecting to login page...
          </p>
        )}
        <AuthButton type='submit' disabled={disabledButton}>
          Sign up
        </AuthButton>
      </form>
      <small className='my-4 sm:bg-gray-50 sm:w-96 sm:text-center sm:py-4 sm:border sm:border-gray-300'>
        Already have an account?{' '}
        <Link to='/login' className='text-light-blue font-semibold'>
          Log in
        </Link>
      </small>
    </div>
  );
};

export default Signup;
