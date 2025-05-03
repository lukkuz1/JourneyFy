import React from 'react';
import { Text } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';


jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
}));
jest.mock('../../src/services/firebase', () => ({
  db: {},
}));

import useRideAndDriver from '../../src/hooks/useRideAndDriver';
import { doc, getDoc } from 'firebase/firestore';

const TestComponent = ({ rideId }) => {
  const [ride, driver] = useRideAndDriver(rideId);
  return (
    <>
      <Text testID="ride">{JSON.stringify(ride)}</Text>
      <Text testID="driver">{JSON.stringify(driver)}</Text>
    </>
  );
};

describe('useRideAndDriver integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    doc.mockImplementation((db, collection, id) => `${collection}-${id}`);
  });

  it('returns [null, null] and does not call getDoc when rideId is not provided', () => {
    const { getByTestId } = render(<TestComponent rideId={null} />);
    expect(getByTestId('ride').props.children).toBe('null');
    expect(getByTestId('driver').props.children).toBe('null');
    expect(getDoc).not.toHaveBeenCalled();
  });

  it('fetches ride then driver and returns them', async () => {
    getDoc
      .mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ id: 'ride123', userId: 'userABC', foo: 'bar' }),
      })
      .mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ uid: 'userABC', name: 'Alice' }),
      });

    const { getByTestId } = render(<TestComponent rideId="ride123" />);

    await waitFor(() => {
      expect(getDoc).toHaveBeenCalledTimes(2);
    });

    const ride = JSON.parse(getByTestId('ride').props.children);
    expect(ride).toMatchObject({ id: 'ride123', userId: 'userABC', foo: 'bar' });

    const driver = JSON.parse(getByTestId('driver').props.children);
    expect(driver).toMatchObject({ uid: 'userABC', name: 'Alice' });
  });
});