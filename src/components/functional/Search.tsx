import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import UserSummaryResponse from '../../interfaces/UserSummaryResponse';

const Search = (): ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [users, setUsers] = useState<UserSummaryResponse[]>([]);

  useEffect(() => {
    const interval = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(interval);
    };
  }, [searchTerm]);

  useEffect(() => {
    let fetch = true;
    const fetchUsers = async (): Promise<void> => {
      try {
        const { data }: { data: UserSummaryResponse[] } = await axios.get(
          '/users',
          {
            params: {
              username: debouncedSearchTerm,
            },
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        setUsers(data);
      } catch (error) {
        console.log(error.response.data.errors);
      }
    };
    if (fetch && debouncedSearchTerm) fetchUsers();
    return () => {
      fetch = false;
    };
  }, [debouncedSearchTerm]);

  const renderedUsers = users.map(({ userId, username, imageUrl }) => (
    <li
      key={userId}
      className='hover:bg-gray-50 border-b border-gray-100 last:border-b-0'
    >
      <Link to='/' className='flex p-3'>
        <img src={imageUrl} alt='' className='h-7 w-7 rounded-full mr-4' />
        {username}
      </Link>
    </li>
  ));

  return (
    <div className='relative'>
      <input
        autoComplete='off'
        type='text'
        name='search'
        id='search'
        placeholder='Search'
        className='bg-gray-50 border border-gray-300 rounded-sm w-full focus:outline-none px-2 py-0.5 z-20 text-center xl:w-56'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul
        className={`absolute bg-white rounded-sm shadow-lg w-56 left-1/2 transform -translate-x-1/2 top-10 border border-gray-50 ${
          debouncedSearchTerm ? 'block' : 'hidden'
        }`}
      >
        {renderedUsers}
      </ul>
    </div>
  );
};

export default Search;
