import React from 'react';
import { Redirect } from 'react-router-dom';
import LandingPage from '../../pages/LandingPage';
import { useAuth } from '../../utilities/contexts/authContext';
import Dashboard from '../../pages/Dashboard';

export default function LoggedInNavigation() {
    const { currentUser } = useAuth();


    if(currentUser) {
      return <Redirect to='/dashboard' component={Dashboard} />
    }
  
     return(
       <div>
         <Redirect to='/welcome' component={LandingPage} />
       </div>
     );
}
