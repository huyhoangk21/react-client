import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Header = (): ReactElement => {
  return (
    <header className='px-96 border-b border-gray-300'>
      <div className='w-full flex h-14 justify-between items-center'>
        <h1 className='text-3xl text-center font-semibold'>Instagram</h1>
        <div className='relative'>
          <label className='absolute text-gray-400 text-sm flex items-center translate-x-1/2'>
            <FaSearch className='mr-1' /> Search
          </label>
          <input
            type='text'
            name='search'
            id='search'
            className='bg-gray-50 border border-gray-300 rounded-sm w-52 focus:outline-none px-2 py-0.5 z-20'
          />
        </div>
        <div>
          <Link to='/'>Home</Link>
          <Link to='/'>Profile</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
