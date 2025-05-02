/**
 * __tests__/Register.test.js
 */
import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../src/hooks/useAuth';
import Register from '../../../src/screens/Entry/Register';

// --- mocks ---
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
jest.mock('../../../src/hooks/useAuth'); 

beforeEach(() => {
  jest.clearAllMocks();
  // spy on Alert.alert
  jest.spyOn(Alert, 'alert').mockImplementation(() => {});
});

describe('<Register />', () => {
  it('calls auth.signUp with email & password', async () => {
    const mockSignUp = jest.fn().mockResolvedValue(true);
    useAuth.mockReturnValue({ signUp: mockSignUp });
    const mockNav = { navigate: jest.fn() };
    useNavigation.mockReturnValue(mockNav);

    const { getByPlaceholderText, getByText } = render(<Register />);

    // Fill in inputs
    fireEvent.changeText(
      getByPlaceholderText('Įveskite savo el. paštą'),
      'foo@example.com'
    );
    fireEvent.changeText(
      getByPlaceholderText('Įveskite savo slaptažodį'),
      'secret123'
    );

    // Press the button
    fireEvent.press(getByText('Registruotis'));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith(
        'foo@example.com',
        'secret123'
      );
    });
  });

  it('shows error text when signUp returns a string', async () => {
    const mockSignUp = jest.fn().mockResolvedValue('Email already in use');
    useAuth.mockReturnValue({ signUp: mockSignUp });
    useNavigation.mockReturnValue({ navigate: jest.fn() });

    const { getByPlaceholderText, getByText, findByText } = render(<Register />);

    fireEvent.changeText(
      getByPlaceholderText('Įveskite savo el. paštą'),
      'bar@example.com'
    );
    fireEvent.changeText(
      getByPlaceholderText('Įveskite savo slaptažodį'),
      'password'
    );
    fireEvent.press(getByText('Registruotis'));

    expect(await findByText('Email already in use')).toBeTruthy();
  });

  it('alerts and navigates on successful signup', async () => {
    const mockSignUp = jest.fn().mockResolvedValue(true);
    useAuth.mockReturnValue({ signUp: mockSignUp });
    const mockNav = { navigate: jest.fn() };
    useNavigation.mockReturnValue(mockNav);

    const { getByPlaceholderText, getByText } = render(<Register />);

    fireEvent.changeText(
      getByPlaceholderText('Įveskite savo el. paštą'),
      'baz@example.com'
    );
    fireEvent.changeText(
      getByPlaceholderText('Įveskite savo slaptažodį'),
      'mypassword'
    );
    fireEvent.press(getByText('Registruotis'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Verifikacijos nuoroda išsiųsta',
        'Patvirtinkite savo el. paštą, kad galėtumėte prisijungti prie programėlės.'
      );
      expect(mockNav.navigate).toHaveBeenCalledWith('Login');
    });
  });
});
