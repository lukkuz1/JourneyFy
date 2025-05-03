// _tests_/Integration/useUserProfile.integration.test.js
import React from 'react';
import { Text, Button } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
}));
jest.mock('../../src/services/firebase', () => ({
  db: {},
  auth: { currentUser: { uid: 'user1' } },
}));

import { useUserProfile } from '../../src/hooks/useUserProfile';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const TestComponent = () => {
  const { user, fetchUserProfile, refreshing, onRefresh } = useUserProfile();
  return (
    <>
      <Text testID="user">{JSON.stringify(user)}</Text>
      <Text testID="refreshing">{String(refreshing)}</Text>
      <Button title="Fetch" onPress={fetchUserProfile} />
      <Button title="Refresh" onPress={onRefresh} />
    </>
  );
};

describe('useUserProfile integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    doc.mockReturnValue('userDocRef');
  });

  it('populates user state when document exists', async () => {
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ firstName: 'John', lastName: 'Doe' }),
    });

    const { getByTestId, getByText } = render(<TestComponent />);
    fireEvent.press(getByText('Fetch'));

    await waitFor(() =>
      expect(getByTestId('user').props.children).toBe(
        JSON.stringify({ firstName: 'John', lastName: 'Doe' })
      )
    );
    expect(setDoc).not.toHaveBeenCalled();
  });

  it('creates and sets default profile when document does not exist', async () => {
    getDoc.mockResolvedValue({ exists: () => false });
    setDoc.mockResolvedValue();

    const { getByTestId, getByText } = render(<TestComponent />);
    fireEvent.press(getByText('Fetch'));

    await waitFor(() =>
      expect(getByTestId('user').props.children).toBe(
        JSON.stringify({ firstName: '', lastName: '' })
      )
    );
    expect(setDoc).toHaveBeenCalledWith('userDocRef', {
      firstName: '',
      lastName: '',
    });
  });

  it('onRefresh toggles refreshing and refetches profile', async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ firstName: 'Jane', lastName: 'Smith' }),
    });

    const { getByTestId, getByText } = render(<TestComponent />);
    expect(getByTestId('refreshing').props.children).toBe('false');

    fireEvent.press(getByText('Refresh'));
    // during refresh
    expect(getByTestId('refreshing').props.children).toBe('true');

    await waitFor(() =>
      expect(getByTestId('refreshing').props.children).toBe('false')
    );
    expect(getByTestId('user').props.children).toBe(
      JSON.stringify({ firstName: 'Jane', lastName: 'Smith' })
    );
  });
});