import { ReactElement } from 'react';

const Search = (): ReactElement => {
  return (
    <input
      autoComplete='off'
      type='text'
      name='search'
      id='search'
      placeholder='Search'
      className='bg-gray-50 border border-gray-300 rounded-sm w-full focus:outline-none px-2 py-0.5 z-20 text-center xl:w-56'
    />
  );
};

export default Search;
