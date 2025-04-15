import React from 'react';
import AppNavigation from './src/navigations/AppNavigation';
import { AuthProvider } from './src/hooks/useAuth';
import { UserProvider } from './src/hooks/useUser';


export default function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </UserProvider>
  );
}
