import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '../components/TextField';

const Login = (): ReactElement => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className='w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center'>
      <h1 className='text-4xl text-center font-semibold'>Instagram</h1>
      <form autoComplete='off'>
        <TextField
          id='email'
          type='email'
          name='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='my-1'
        />
        <TextField
          id='password'
          type='password'
          name='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type='submit'
          className='bg-light-blue text-white text-sm font-semibold w-full py-1.5 rounded-sm mt-4'
        >
          Log in
        </button>
      </form>
      <small className='m-4'>
        Don't have an account?{' '}
        <Link to='/signup' className='text-light-blue font-semibold'>
          Sign up
        </Link>
      </small>
    </div>
  );
};

export default Login;
