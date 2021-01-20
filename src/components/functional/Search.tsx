import { ReactElement, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import useSearch from '../../hooks/useSearch';

const Search = (): ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');

  const [show, setShow] = useState(true);

  const searchRef = useRef<HTMLDivElement>(null);
  const users = useSearch(searchTerm);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setShow(false);
    }
  };

  const renderedUsers = users.map(({ userId, username, imageUrl }) => (
    <li
      key={userId}
      className='hover:bg-gray-50 border-b border-gray-100 last:border-b-0'
    >
      <Link
        to={`/${username}`}
        className='flex p-3'
        onClick={() => setSearchTerm('')}
      >
        <img src={imageUrl} alt='' className='h-7 w-7 rounded-full mr-4' />
        {username}
      </Link>
    </li>
  ));

  return (
    <div className='relative' ref={searchRef}>
      <input
        autoComplete='off'
        type='text'
        name='search'
        id='search'
        placeholder='Search'
        className='bg-gray-50 border border-gray-300 rounded-sm w-full focus:outline-none px-2 py-0.5 z-20 text-center xl:w-56'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onClick={() => setShow(true)}
      />
      <ul
        className={`absolute bg-white rounded-sm shadow-lg w-56 left-1/2 transform -translate-x-1/2 top-10 border border-gray-50 ${
          searchTerm && show ? 'block' : 'hidden'
        }`}
      >
        {renderedUsers}
      </ul>
    </div>
  );
};

export default Search;
