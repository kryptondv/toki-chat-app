import React, { useContext } from 'react';
import { GlobalContext } from '../context';

const Dashboard = () => {
  const { isLoggedIn } = useContext(GlobalContext);



  return (
    <div>
      Dashboard
      {isLoggedIn ? 'Yes' : 'No'}
    </div>
  );
}

export default Dashboard;
