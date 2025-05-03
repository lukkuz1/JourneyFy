
import React from 'react';
import { Button, Text, Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  serverTimestamp: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

import useCreateJourney from '../../src/hooks/useCreateJourney';
import { getAuth } from 'firebase/auth';
import { addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

const TestComponent = () => {
  const { createJourney, loading, error } = useCreateJourney();
  return (
    <>
      <Text testID="loading">{String(loading)}</Text>
      <Text testID="error">{error ?? 'null'}</Text>
      <Button
        title="Go"
        onPress={() =>
          createJourney({
            pickupAddress: 'A',
            destinationAddress: 'B',
            journeyDateTime: '2025-05-03T10:00:00Z',
            seats: 2,
            journeyType: 'offer',
            status: 'pending',
            car: 'MyCar',
            price: 50,
            facilities: 'wifi',
          })
        }
      />
    </>
  );
};

describe('useCreateJourney integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getAuth.mockReturnValue({ currentUser: { uid: 'u1', email: 'e@e.com' } });
    addDoc.mockResolvedValue({ id: 'journey123' });
    updateDoc.mockResolvedValue();
    serverTimestamp.mockReturnValue('ts');
  });

  it('creates a new journey and calls Alert.alert on success', async () => {
    const { getByTestId, getByText } = render(<TestComponent />);

    expect(getByTestId('loading').props.children).toBe('false');
    expect(getByTestId('error').props.children).toBe('null');

    fireEvent.press(getByText('Go'));

    await waitFor(() =>
      expect(getByTestId('loading').props.children).toBe('false')
    );


    expect(getByTestId('error').props.children).toBe('null');


    expect(addDoc).toHaveBeenCalledTimes(1);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Sekmės pranešimas',
      'Kelionė sėkmingai sukurta!'
    );
  });
});
