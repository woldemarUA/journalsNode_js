import React from 'react';

import { jwtDecode } from 'jwt-decode';

function DashboardPage() {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  localStorage.setItem('userId', decoded.id);
  localStorage.setItem('username', decoded.username);
  console.log(decoded);
  return <div>DashboardPage</div>;
}

export default DashboardPage;
