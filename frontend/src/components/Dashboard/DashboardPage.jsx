import React from 'react';
import { useUser } from '../../context/UserProvider';
import { Alert } from 'react-bootstrap';

function DashboardPage() {
  const { user } = useUser();
  console.log(user);
  return (
    <>
      <Alert variant='success'> Bonjour {user.username || 'Guest'}</Alert>
    </>
  );
}

export default DashboardPage;
