// _tests_/Unit/Authentication/Login.test.js
import React from 'react';
import { Text, Pressable, Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// 1) Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

// 2) Mock useAuth
const mockSignIn = jest.fn();
jest.mock('../../../src/hooks/useAuth', () => ({
  useAuth: () => ({ signIn: mockSignIn }),
}));

// 3) Stub EntryInputField and EntryButton
jest.mock(
  '../../../src/components/Entry/EntryInputField',
  () => props => {
    const React = require('react');
    const { TextInput } = require('react-native');
    return React.createElement(TextInput, {
      testID: props.headerText === 'El. paštas' ? 'email-input' : 'password-input',
      secureTextEntry: props.isPassword,
      onChangeText: props.onChangeText,
    });
  }
);
jest.mock(
  '../../../src/components/Entry/EntryButton',
  () => props => {
    const React = require('react');
    const { Button } = require('react-native');
    return React.createElement(Button, {
      testID: 'login-button',
      title: props.text,
      onPress: props.onPress,
    });
  }
);

// 4) Import AFTER mocks
import Login from '../../../src/screens/Entry/Login';

describe('Login screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  it('renders inputs and no error initially', () => {
    const { queryByText, getByTestId } = render(<Login />);
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(queryByText(/Prisijungimas/)).toBeTruthy();
  });

  it('calls signIn with email and password', async () => {
    mockSignIn.mockResolvedValue(undefined);
    const { getByTestId } = render(<Login />);
    fireEvent.changeText(getByTestId('email-input'), 'u@e.com');
    fireEvent.changeText(getByTestId('password-input'), 'secret');
    fireEvent.press(getByTestId('login-button'));
    await waitFor(() =>
      expect(mockSignIn).toHaveBeenCalledWith('u@e.com', 'secret')
    );
  });

  it('navigates to ForgotPassword on link press', () => {
    const { getByText } = render(<Login />);
    fireEvent.press(getByText('Pamiršote slaptažodį?'));
    expect(mockNavigate).toHaveBeenCalledWith('ForgotPassword');
  });

  it('navigates to Register on sign-up link press', () => {
    const { getByText } = render(<Login />);
    fireEvent.press(getByText('Pradėkite jau šiandien!'));
    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });
});
