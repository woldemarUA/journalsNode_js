import React from 'react';

import { jwtDecode } from 'jwt-decode';

function DashboardPage() {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  console.log(decoded);
  return <div>DashboardPage</div>;
}

export default DashboardPage;
