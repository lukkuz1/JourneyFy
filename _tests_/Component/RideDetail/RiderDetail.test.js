import React from 'react';
import { render } from '@testing-library/react-native';
import RiderDetail from '../../../src/components/RideDetail/RiderDetail';

describe('RiderDetail (ride info)', () => {
  const ride = {
    pickupAddress: 'Start A',
    destinationAddress: 'End B',
    journeyDateTime: '2025-05-02 14:30'
  };
  it('renders pickup, dropoff and date/time', () => {
    const { getByText } = render(<RiderDetail ride={ride} navigation={{}} />);
    expect(getByText('Kelionės informacija')).toBeTruthy();
    expect(getByText('Start A')).toBeTruthy();
    expect(getByText('End B')).toBeTruthy();
    expect(getByText('Pradžios laikas')).toBeTruthy();
    expect(getByText('2025-05-02 14:30')).toBeTruthy();
  });
});
