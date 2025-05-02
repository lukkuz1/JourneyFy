/**
 * __tests__/Login.test.js
 */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../src/hooks/useAuth';
import Login from '../../../src/screens/Entry/Login';

// --- Mocks ---
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
jest.mock('../../../src/hooks/useAuth');

describe('<Login />', () => {
  let mockNavigate;
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });
  });

  it('calls auth.signIn with email & password', async () => {
    const mockSignIn = jest.fn().mockResolvedValue(undefined);
    useAuth.mockReturnValue({ signIn: mockSignIn });

    const { getByPlaceholderText, getByText } = render(<Login />);

    fireEvent.changeText(
      getByPlaceholderText('Įveskite savo el. paštą'),
      'foo@example.com'
    );
    fireEvent.changeText(
      getByPlaceholderText('Įveskite savo slaptažodį'),
      'secret'
    );
    fireEvent.press(getByText('Prisijungti'));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        'foo@example.com',
        'secret'
      );
    });
  });

  it('displays error text when signIn returns a string', async () => {
    const mockSignIn = jest.fn().mockResolvedValue('auth/invalid-credentials');
    useAuth.mockReturnValue({ signIn: mockSignIn });

    const { getByPlaceholderText, getByText, findByText } = render(<Login />);

    fireEvent.changeText(
      getByPlaceholderText('Įveskite savo el. paštą'),
      'bar@example.com'
    );
    fireEvent.changeText(
      getByPlaceholderText('Įveskite savo slaptažodį'),
      'badpass'
    );
    fireEvent.press(getByText('Prisijungti'));

    expect(await findByText('auth/invalid-credentials')).toBeTruthy();
  });

  it('navigates to ForgotPassword when link pressed', () => {
    useAuth.mockReturnValue({ signIn: jest.fn() });
    const { getByText } = render(<Login />);
    fireEvent.press(getByText('Pamiršote slaptažodį?'));
    expect(mockNavigate).toHaveBeenCalledWith('ForgotPassword');
  });

  it('navigates to Register when sign-up link pressed', () => {
    useAuth.mockReturnValue({ signIn: jest.fn() });
    const { getByText } = render(<Login />);
    fireEvent.press(getByText('Pradėkite jau šiandien!'));
    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });
});
