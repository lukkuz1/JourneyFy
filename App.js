import React from 'react';
import AppNavigation from './src/navigations/AppNavigation';
import { AuthProvider } from './src/hooks/useAuth';
import { UserProvider } from './src/hooks/useUser';
import I18n from './src/hooks/i18n';

I18n.locale = I18n.locale || 'en';

export default function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </UserProvider>
  );
}
