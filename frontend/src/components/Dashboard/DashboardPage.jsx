import React from 'react';

import { jwtDecode } from 'jwt-decode';
import { Alert } from 'react-bootstrap';

function DashboardPage() {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  localStorage.setItem('userId', decoded.id);
  localStorage.setItem('username', decoded.username);
  // console.log(decoded);
  return (
    <>
      <Alert variant='success'> Bonjour {decoded.username}</Alert>
    </>
  );
}

export default DashboardPage;
