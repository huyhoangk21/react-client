import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthButton from '../components/AuthButton';
import TextField from '../components/TextField';

const Login = (): ReactElement => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className='w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center sm:bg-gray-100'>
      <form
        autoComplete='off'
        className='w-72 sm:bg-gray-50 sm:border sm:border-gray-300 sm:w-80 sm:p-8 sm:pb-12'
      >
        <h1 className='text-4xl text-center font-semibold mb-4'>Instagram</h1>
        <TextField
          id='email'
          type='email'
          name='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='mb-0.5'
        />
        <TextField
          id='password'
          type='password'
          name='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <AuthButton type='submit'>Log in</AuthButton>
      </form>
      <small className='my-4 sm:bg-gray-50 sm:w-80 sm:text-center sm:py-4 sm:border sm:border-gray-300'>
        Don't have an account?{' '}
        <Link to='/signup' className='text-light-blue font-semibold'>
          Sign up
        </Link>
      </small>
    </div>
  );
};

export default Login;
