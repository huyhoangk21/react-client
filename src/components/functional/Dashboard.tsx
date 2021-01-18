import { ReactElement, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthStateContext } from '../../contexts/AuthProvider';
const Dashboard = (): ReactElement => {
  const { imageUrl } = useContext(AuthStateContext);
  return (
    <div>
      <Link to='/'>
        <img
          src={imageUrl}
          alt='Current user profile pic'
          className='h-6 w-6 rounded-full'
        />
      </Link>
    </div>
  );
};

export default Dashboard;
