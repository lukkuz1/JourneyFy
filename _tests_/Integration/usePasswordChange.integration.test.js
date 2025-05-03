// _tests_/Integration/usePasswordChange.integration.test.js
import React from 'react';
import { Text, Button, Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';


jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  updatePassword: jest.fn(),
  reauthenticateWithCredential: jest.fn(),
  EmailAuthProvider: {},
}));


jest.spyOn(Alert, 'alert').mockImplementation(() => {});


import { usePasswordChange } from '../../src/hooks/usePasswordChange';
import { getAuth, updatePassword } from 'firebase/auth';


const TestComponent = () => {
  const {
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    handlePasswordChange,
  } = usePasswordChange();

  return (
    <>
      <Text testID="new">{newPassword}</Text>
      <Text testID="confirm">{confirmPassword}</Text>
      <Button title="Mismatch" onPress={() => {
        setNewPassword('abc');
        setConfirmPassword('def');
      }} />
      <Button title="TooShort" onPress={() => {
        setNewPassword('123');
        setConfirmPassword('123');
      }} />
      <Button title="Valid" onPress={() => {
        setNewPassword('abcdef');
        setConfirmPassword('abcdef');
      }} />
      <Button title="Change" onPress={handlePasswordChange} />
    </>
  );
};

describe('usePasswordChange integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getAuth.mockReturnValue({ currentUser: { uid: 'u1' } });
  });

  it('alerts error when passwords do not match', async () => {
    const { getByText } = render(<TestComponent />);

    fireEvent.press(getByText('Mismatch'));
    fireEvent.press(getByText('Change'));

    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        'Klaida',
        'Slaptažodžiai nesutampa'
      )
    );
    expect(updatePassword).not.toHaveBeenCalled();
  });

  it('alerts error when password is too short', async () => {
    const { getByText } = render(<TestComponent />);

    fireEvent.press(getByText('TooShort'));
    fireEvent.press(getByText('Change'));

    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        'Klaida',
        'Slaptažodį turi sudaryti bent 6 simboliai'
      )
    );
    expect(updatePassword).not.toHaveBeenCalled();
  });

  it('calls updatePassword and alerts success on valid passwords', async () => {
    updatePassword.mockResolvedValue();

    const { getByText } = render(<TestComponent />);

    fireEvent.press(getByText('Valid'));
    fireEvent.press(getByText('Change'));

    await waitFor(() =>
      expect(updatePassword).toHaveBeenCalledWith(
        getAuth().currentUser,
        'abcdef'
      )
    );
    expect(Alert.alert).toHaveBeenCalledWith(
      'Sekmės pranešimas',
      'Slaptažodis pakeistas sėkmingai'
    );
  });

  it('alerts re-authentication message on requires-recent-login error', async () => {
    updatePassword.mockRejectedValue({ code: 'auth/requires-recent-login' });

    const { getByText } = render(<TestComponent />);

    fireEvent.press(getByText('Valid'));
    fireEvent.press(getByText('Change'));

    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        'Reikalingas pakartotinis autentifikavimas',
        'Prisijunkite dar kartą arba patvirtinkite savo tapatybę, kad pakeistumėte slaptažodį.'
      )
    );
  });

  it('alerts generic failure on other errors', async () => {
    updatePassword.mockRejectedValue({ code: 'auth/other-error' });

    const { getByText } = render(<TestComponent />);

    fireEvent.press(getByText('Valid'));
    fireEvent.press(getByText('Change'));

    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        'Klaida',
        'Nepavyko pakeisti slaptažodžio'
      )
    );
  });
});