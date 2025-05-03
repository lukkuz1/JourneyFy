import React from 'react';
import { Text, Button, Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';


jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
}));


jest.spyOn(Alert, 'alert').mockImplementation(() => {});

import useFindMatchingJourneys from '../../src/hooks/useFindMatchingJourneys';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';


const TestComponent = () => {
  const { findMatchingJourneys, loading } = useFindMatchingJourneys();
  return (
    <>
      <Text testID="loading">{String(loading)}</Text>
      <Button
        title="Find"
        onPress={() =>
          findMatchingJourneys({
            pickupAddress: 'A',
            destinationAddress: 'B',
            journeyDateTime: '2025-05-03T10:00:00Z',
            seats: 2,
          })
        }
      />
    </>
  );
};

describe('useFindMatchingJourneys integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // 5) Stub the Firestore chain
    getFirestore.mockReturnValue('dbRef');
    collection.mockReturnValue('journeysCollection');
    query.mockImplementation((refArg, ...conds) => 'journeysQuery');
    where.mockImplementation((...args) => args);
  });

  it('alerts with the correct message when journeys are found', async () => {

    const fakeDocs = [
      { id: 'j1', data: () => ({ foo: 'bar' }) },
      { id: 'j2', data: () => ({ baz: 123 }) },
    ];
    getDocs.mockResolvedValue({ docs: fakeDocs });

    const { getByTestId, getByText } = render(<TestComponent />);


    expect(getByTestId('loading').props.children).toBe('false');

    fireEvent.press(getByText('Find'));

    await waitFor(() =>
      expect(getByTestId('loading').props.children).toBe('false')
    );

    expect(getDocs).toHaveBeenCalledWith('journeysQuery');

    expect(Alert.alert).toHaveBeenCalledWith(
      'Rastos kelionės',
      'Radome 2 atitinkančią kelionę (-es).',
      [{ text: 'Gerai' }]
    );
  });

  it('alerts with the not-found message when no journeys exist', async () => {

    getDocs.mockResolvedValue({ docs: [] });

    const { getByTestId, getByText } = render(<TestComponent />);

    expect(getByTestId('loading').props.children).toBe('false');

    fireEvent.press(getByText('Find'));

    await waitFor(() =>
      expect(getByTestId('loading').props.children).toBe('false')
    );

    expect(getDocs).toHaveBeenCalledWith('journeysQuery');

    expect(Alert.alert).toHaveBeenCalledWith(
      'Nerasta jokių kelionių',
      'Atsiprašome, bet jokių kelionių atitinkančių kriterijus nebuvo rasta',
      [{ text: 'OK' }]
    );
  });
});