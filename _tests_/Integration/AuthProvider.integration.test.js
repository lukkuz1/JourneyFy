
jest.mock('firebase/auth', () => ({
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    updatePassword: jest.fn(),
    updateEmail: jest.fn(),
    sendEmailVerification: jest.fn(),
  }));
  

  jest.mock('../../src/services/firebase', () => ({
    auth: {
      currentUser: null,
      signOut: jest.fn(),
    },
  }));
  

  jest.mock('../../src/hooks/useUser', () => ({
    useUser: () => ({
      initialized: true,
      initialize: jest.fn(),
      destroy: jest.fn(),
    }),
  }));

  import React from 'react';
  import { Text } from 'react-native';
  import { render } from '@testing-library/react-native';
  import { AuthProvider, useAuth } from '../../src/hooks/useAuth';
  
  const TestConsumer = () => {
    const { loggedIn, user } = useAuth();
    return (
      <>
        <Text testID="loggedIn">{String(loggedIn)}</Text>
        <Text testID="user">{user ? user.uid : 'null'}</Text>
      </>
    );
  };
  
  describe('AuthProvider integration', () => {
    it('renders children with default (logged out) state', () => {
      const { getByTestId } = render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );
  
      expect(getByTestId('loggedIn').props.children).toBe('false');
      expect(getByTestId('user').props.children).toBe('null');
    });
  });  