import React, { useState } from 'react';
import { Text, Button } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));
jest.mock('../../src/services/firebase', () => ({
  db: {},
}));

import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import useUserInfo from '../../src/hooks/useUserInfo';

const TestComponent = () => {
  const { saveUserInfo, error } = useUserInfo();
  const [result, setResult] = useState('');
  return (
    <>
      <Text testID="error">{error}</Text>
      <Text testID="result">{String(result)}</Text>
      <Button
        title="Empty"
        onPress={async () => setResult(await saveUserInfo('', '', '', null))}
      />
      <Button
        title="Success"
        onPress={async () =>
          setResult(
            await saveUserInfo(
              'usr',
              'Name',
              'Surname',
              new Date('2000-01-01')
            )
          )
        }
      />
      <Button
        title="Fail"
        onPress={async () => {
          setDoc.mockRejectedValueOnce(new Error('fail'));
          setResult(
            await saveUserInfo(
              'usr',
              'Name',
              'Surname',
              new Date('2000-01-01')
            )
          );
        }}
      />
    </>
  );
};

describe('useUserInfo integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getAuth.mockReturnValue({ currentUser: { uid: 'uid1' } });
    doc.mockReturnValue('docRef');
    setDoc.mockResolvedValue();
  });

  it('returns false and sets error when fields are missing', async () => {
    const { getByText, getByTestId } = render(<TestComponent />);

    fireEvent.press(getByText('Empty'));

    await waitFor(() =>
      expect(getByTestId('result').props.children).toBe('false')
    );
    expect(getByTestId('error').props.children).toBe('Užpildykite visus laukus');
    expect(setDoc).not.toHaveBeenCalled();
  });

  it('saves user info and returns true on success', async () => {
    const { getByText, getByTestId } = render(<TestComponent />);

    fireEvent.press(getByText('Success'));

    await waitFor(() =>
      expect(getByTestId('result').props.children).toBe('true')
    );
    expect(setDoc).toHaveBeenCalledWith('docRef', {
      username: 'usr',
      name: 'Name',
      surname: 'Surname',
      dateOfBirth: '2000-01-01',
    });
    expect(getByTestId('error').props.children).toBe('');
  });

  it('returns false and sets error on setDoc failure', async () => {
    const { getByText, getByTestId } = render(<TestComponent />);

    fireEvent.press(getByText('Fail'));

    await waitFor(() =>
      expect(getByTestId('result').props.children).toBe('false')
    );
    expect(getByTestId('error').props.children).toBe(
      'Klaida išsaugant naudotojo informaciją'
    );
  });
});
