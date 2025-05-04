import React from 'react';
import { Text, Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

const mockSignUp = jest.fn();
jest.mock('../../../src/hooks/useAuth', () => ({
  useAuth: () => ({ signUp: mockSignUp }),
}));

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

import Register from '../../../src/screens/Entry/Register';

describe('Register screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  it('shows error when signUp returns an error code string', async () => {
    mockSignUp.mockResolvedValue('auth/email-already-in-use');
    const { getByTestId, findByText } = render(<Register />);

    fireEvent.changeText(getByTestId('El. paštas'), 'dup@example.com');
    fireEvent.changeText(getByTestId('Slaptažodis'), 'pwd123');
    fireEvent.press(getByTestId('signup-button'));

    expect(await findByText('auth/email-already-in-use')).toBeTruthy();

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

    await waitFor(() => {
      expect(queryByText(/@/)).toBeNull();
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
