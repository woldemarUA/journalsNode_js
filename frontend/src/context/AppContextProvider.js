import React from 'react';

import { UserProvider } from './UserProvider';
import { ArticlesProvider } from './ArticlesProvider';
import { ChatProvider } from './ChatProvider';
import { FirebaseProvider } from './FIrebaseProvider';

const AppContextProvider = ({ children }) => {
  return (
    <UserProvider>
      <FirebaseProvider>
        <ChatProvider>
          <ArticlesProvider>{children}</ArticlesProvider>
        </ChatProvider>
      </FirebaseProvider>
    </UserProvider>
  );
};

export default AppContextProvider;
