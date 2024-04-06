import React from 'react';

import { UserProvider } from './UserProvider';
import { ArticlesProvider } from './ArticlesProvider';
import { ChatProvider } from './ChatProvider';

const AppContextProvider = ({ children }) => {
  return (
    <UserProvider>
      <ChatProvider>
        <ArticlesProvider>{children}</ArticlesProvider>
      </ChatProvider>
    </UserProvider>
  );
};

export default AppContextProvider;
