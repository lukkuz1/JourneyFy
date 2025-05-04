import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';


const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('../../../src/services/firebase', () => ({
  auth: {},
}));

jest.mock('firebase/auth', () => ({
  sendPasswordResetEmail: jest.fn(),
}));

jest.mock(
  '../../../src/components/Entry/EntryInputField',
  () => {
    const React = require('react');
    const { TextInput } = require('react-native');
    return props =>
      React.createElement(TextInput, {
        testID: 'email-input',
        onChangeText: props.onChangeText,
        value: props.value,
        placeholder: 'pavyzdys@gmail.com',
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
        testID: 'reset-button',
        title: props.text,
        onPress: props.onPress,
      });
  }
);

// 5) Import AFTER mocks
import { sendPasswordResetEmail } from 'firebase/auth';
import ForgotPassword from '../../../src/screens/Entry/ForgotPassword';

describe('ForgotPassword screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  it('alerts error when email is empty', () => {
    const { getByTestId } = render(<ForgotPassword />);
    fireEvent.press(getByTestId('reset-button'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Neteisingas el. paštas',
      'Prašome įvesti teisingą el. paštą.'
    );
    expect(sendPasswordResetEmail).not.toHaveBeenCalled();
  });

  it('sends reset email and navigates on success', async () => {
    sendPasswordResetEmail.mockResolvedValue();
    const { getByTestId } = render(<ForgotPassword />);
    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.press(getByTestId('reset-button'));

    await waitFor(() =>
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(
        expect.any(Object),
        'test@example.com'
      )
    );
    expect(Alert.alert).toHaveBeenCalledWith(
      'Slaptažodžio priminimo nuoroda nusiųsta',
      'Jeigu turite paskyrą, slaptažodžio priminimo nuoroda išsiųsta į el. paštą'
    );
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  it('handles invalid-email error', async () => {
    sendPasswordResetEmail.mockRejectedValue({ code: 'auth/invalid-email' });
    const { getByTestId } = render(<ForgotPassword />);
    fireEvent.changeText(getByTestId('email-input'), 'bad-email');
    fireEvent.press(getByTestId('reset-button'));

    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        'Neteisingas el. pašto adresas',
        'Įveskite galiojantį el. pašto adresą.'
      )
    );
  });

  it('handles user-not-found error', async () => {
    sendPasswordResetEmail.mockRejectedValue({ code: 'auth/user-not-found' });
    const { getByTestId } = render(<ForgotPassword />);
    fireEvent.changeText(getByTestId('email-input'), 'missing@x.com');
    fireEvent.press(getByTestId('reset-button'));

    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        'El. pašto adresas nerastas',
        'Šis el. pašto adresas nesusijęs su jokia paskyra.'
      )
    );
  });

  it('handles other errors', async () => {
    sendPasswordResetEmail.mockRejectedValue({ code: 'other', message: 'oops' });
    const { getByTestId } = render(<ForgotPassword />);
    fireEvent.changeText(getByTestId('email-input'), 'foo@bar.com');
    fireEvent.press(getByTestId('reset-button'));

    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        'Slaptažodžio atkūrimas nepavyko',
        'oops'
      )
    );
  });

  it('navigates to Register when sign-up link pressed', () => {
    const { getByText } = render(<ForgotPassword />);
    fireEvent.press(getByText('Pradėkite jau šiandien!'));
    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });
});