import React from 'react';

import { UserProvider } from './UserProvider';

const AppContextProvider = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default AppContextProvider;
