import { useFormik } from 'formik';
import { ReactElement, useContext, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from '../api/axios';
import { AuthActionTypes, AuthDispatchContext } from '../contexts/AuthProvider';
import UserSummaryResponse from '../interfaces/UserSummaryResponse';
import LoginSchema from '../validations/LoginSchema';
import AuthButton from '../components/ui/AuthButton';
import TextField from '../components/ui/TextField';

const Login = ({ history }: RouteComponentProps): ReactElement => {
  const dispatch = useContext(AuthDispatchContext);
  const [error, setError] = useState('');
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    validateOnBlur: false,
    onSubmit: async ({ email, password }) => {
      try {
        const {
          headers,
          data,
        }: { headers: any; data: UserSummaryResponse } = await axios.post(
          '/auth/login',
          {
            email,
            password,
          }
        );
        localStorage.setItem('token', headers.authorization);
        dispatch({
          type: AuthActionTypes.LOGIN,
          payload: {
            authenticated: true,
            ...data,
          },
        });
        history.push('/');
      } catch (error) {
        setError('Email or password is incorrect');
      }
    },
  });

  const disabledButton =
    isSubmitting ||
    values.email.length === 0 ||
    values.password.length === 0 ||
    errors.email !== undefined ||
    errors.password !== undefined;

  return (
    <div className='w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center sm:bg-gray-100'>
      <form
        autoComplete='off'
        onSubmit={handleSubmit}
        className='w-72 sm:bg-gray-50 sm:border sm:border-gray-300 sm:w-96 sm:p-10 sm:pb-12'
      >
        <h1 className='text-4xl text-center font-semibold mb-4'>Instagram</h1>
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
          {errors.email || errors.password || error}
        </p>
        <AuthButton type='submit' disabled={disabledButton}>
          Log in
        </AuthButton>
      </form>
      <small className='my-4 sm:bg-gray-50 sm:w-96 sm:text-center sm:py-4 sm:border sm:border-gray-300'>
        Don't have an account?{' '}
        <Link to='/signup' className='text-light-blue font-semibold'>
          Sign up
        </Link>
      </small>
    </div>
  );
};

export default Login;
