// _tests_/Unit/Authentication/Register.test.js
import React from 'react';
import { Text, Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// 1) Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

// 2) Mock useAuth.signUp
const mockSignUp = jest.fn();
jest.mock('../../../src/hooks/useAuth', () => ({
  useAuth: () => ({ signUp: mockSignUp }),
}));

// 3) Stub EntryInputField and EntryButton without out-of-scope vars
jest.mock(
  '../../../src/components/Entry/EntryInputField',
  () => {
    const React = require('react');
    const { TextInput } = require('react-native');
    return props =>
      React.createElement(TextInput, {
        testID: props.headerText,
        onChangeText: props.onChangeText,
        value: props.value,
        placeholder: props.placeholderText,
        secureTextEntry: props.isPassword,
      });
  }
);
jest.mock(
  '../../../src/components/Entry/EntryButton',
  () => {
    const React = require('react');
    const { Button } = require('react-native');
    return props =>
      React.createElement(Button, {
        testID: 'signup-button',
        title: props.text,
        onPress: props.onPress,
      });
  }
);

// 4) Import after mocks
import Register from '../../../src/screens/Entry/Register';

describe('Register screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  it('shows error when signUp returns an error code string', async () => {
    mockSignUp.mockResolvedValue('auth/email-already-in-use');
    const { getByTestId, findByText } = render(<Register />);

    // Fill email/password
    fireEvent.changeText(getByTestId('El. paštas'), 'dup@example.com');
    fireEvent.changeText(getByTestId('Slaptažodis'), 'pwd123');
    fireEvent.press(getByTestId('signup-button'));

    // Wait for error text to appear
    expect(await findByText('auth/email-already-in-use')).toBeTruthy();

    // No navigation or alert on success path
    expect(Alert.alert).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('alerts success and navigates when signUp succeeds', async () => {
    mockSignUp.mockResolvedValue({ user: { uid: 'u1' } });
    const { getByTestId } = render(<Register />);

    fireEvent.changeText(getByTestId('El. paštas'), 'new@example.com');
    fireEvent.changeText(getByTestId('Slaptažodis'), 'securepwd');
    fireEvent.press(getByTestId('signup-button'));

    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        'Verifikacijos nuoroda išsiųsta',
        'Patvirtinkite savo el. paštą, kad galėtumėte prisijungti prie programėlės.'
      )
    );
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  it('does nothing visible when signUp returns falsy non-string', async () => {
    mockSignUp.mockResolvedValue(undefined);
    const { getByTestId, queryByText } = render(<Register />);

    fireEvent.changeText(getByTestId('El. paštas'), 'foo@bar.com');
    fireEvent.changeText(getByTestId('Slaptažodis'), '123456');
    fireEvent.press(getByTestId('signup-button'));

    // give microtasks a tick
    await waitFor(() => {
      // No error text
      expect(queryByText(/@/)).toBeNull();
      // No alert, no navigation
      expect(Alert.alert).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalledWith('Login');
    });
  });

  it('navigates to Login when "Prisijungti!" pressed', () => {
    const { getByText } = render(<Register />);
    fireEvent.press(getByText('Prisijungti!'));
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
});
