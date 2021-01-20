import { useState, useEffect } from 'react';
import axios from '../api/axios';
import UserSummaryResponse from '../interfaces/UserSummaryResponse';

const useSearch = (searchTerm: string): UserSummaryResponse[] => {
  const [users, setUsers] = useState<UserSummaryResponse[]>([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

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

  return users;
};

export default useSearch;
