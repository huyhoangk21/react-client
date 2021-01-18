import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import Search from '../functional/Search';
import Dashboard from '../functional/Dashboard';

const Header = (): ReactElement => {
  return (
    <header className='border-b border-gray-300 grid grid-cols-3 h-14 px-2 sm:px-24 md:px-32 xl:px-80 2xl:px-96'>
      <div className='flex items-center'>
        <Link to='/'>
          <h1 className='text-xl font-semibold'>Instagram</h1>
        </Link>
      </div>
      <div className='relative flex items-center'>
        <Search />
      </div>
      <div className='flex items-center justify-end'>
        <Link to='/'>
          <AiFillHome className='text-2xl mr-4' />
        </Link>
        <Dashboard />
      </div>
    </header>
  );
};

export default Header;
