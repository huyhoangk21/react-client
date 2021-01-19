import { ReactElement, useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import {
  AuthActionTypes,
  AuthDispatchContext,
  AuthStateContext,
} from '../../contexts/AuthProvider';

const Dashboard = (): ReactElement => {
  const { imageUrl } = useContext(AuthStateContext);
  const dispatch = useContext(AuthDispatchContext);
  const [show, setShow] = useState(false);
  const dashboardRef = useRef<any>(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (dashboardRef.current && !dashboardRef.current.contains(e.target)) {
      setShow(false);
    }
  };

  const logout = () => {
    dispatch({ type: AuthActionTypes.LOGOUT, payload: null });
  };

  return (
    <div className='relative' ref={dashboardRef}>
      <div
        className={`
        h-8 w-8 flex items-center justify-center rounded-full border
          ${show ? ' border-gray-900 ' : 'border-white'}
        `}
      >
        <img
          onClick={() => setShow(!show)}
          src={imageUrl}
          alt='Current user profile pic'
          className='h-6 w-6 rounded-full cursor-pointer'
        />
      </div>
      <div
        className={`absolute rounded-sm shadow-lg w-48 -right-1 top-10 bg-white ${
          show ? 'block' : 'hidden'
        }`}
      >
        <Link
          to='/profile'
          className='flex items-center px-4 pt-4 pb-2 hover:bg-gray-50'
        >
          <FaRegUserCircle className='mr-3' /> Profile
        </Link>
        <button
          onClick={logout}
          className='w-full text-left px-4 pt-2 pb-4 hover:bg-gray-50 border-t border-gray-200'
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
