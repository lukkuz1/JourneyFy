import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../../src/screens/Entry/Login';
import { useAuth } from '../../src/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

jest.mock('../../src/hooks/useAuth');
jest.mock('@react-navigation/native');

describe('Login screen integration', () => {
  let navigateMock;
  beforeEach(() => {
    jest.clearAllMocks();
    navigateMock = jest.fn();
    useNavigation.mockReturnValue({ navigate: navigateMock });
  });

  it('calls signIn and clears error on successful login', async () => {
    const signInMock = jest.fn().mockResolvedValue(undefined);
    useAuth.mockReturnValue({ signIn: signInMock });

    const { getByPlaceholderText, getByText, queryByText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText('Įveskite savo el. paštą'), 'foo@bar.com');
    fireEvent.changeText(getByPlaceholderText('Įveskite savo slaptažodį'), 'hunter2');
    fireEvent.press(getByText('Prisijungti'));

    await waitFor(() => {
      expect(signInMock).toHaveBeenCalledWith('foo@bar.com', 'hunter2');
      // since signIn resolved to undefined, error state should be cleared
      expect(queryByText(/.+/)).toBeNull();
    });
  });

  it('renders error message when signIn returns an error string', async () => {
    const signInMock = jest.fn().mockResolvedValue('Invalid credentials');
    useAuth.mockReturnValue({ signIn: signInMock });

    const { getByPlaceholderText, getByText, findByText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText('Įveskite savo el. paštą'), 'foo@bar.com');
    fireEvent.changeText(getByPlaceholderText('Įveskite savo slaptažodį'), 'badpass');
    fireEvent.press(getByText('Prisijungti'));

    // first ensure the hook was called with correct args
    expect(signInMock).toHaveBeenCalledWith('foo@bar.com', 'badpass');

    // then the error string should appear on screen
    const errorNode = await findByText('Invalid credentials');
    expect(errorNode).toBeTruthy();
  });
});
