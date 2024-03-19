import React from 'react';

import { UserProvider } from './UserProvider';
import { ArticlesProvider } from './ArticlesProvider';

const AppContextProvider = ({ children }) => {
  return (
    <UserProvider>
      <ArticlesProvider>{children}</ArticlesProvider>
    </UserProvider>
  );
};

export default AppContextProvider;
