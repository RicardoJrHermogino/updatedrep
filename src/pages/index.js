import React, { useEffect } from 'react'; // Import useEffect from React
import WelcomeDashboard from './welcome';
import getOrCreateUUID from '../utils/uuid';

export default function Welcome() {
  
  useEffect(() => {
    const userId = getOrCreateUUID();
    console.log('User ID:', userId);
  }, []);

  return (
    <>
      <WelcomeDashboard />
    </>
  );
}
