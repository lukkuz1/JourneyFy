import React from 'react';
import { render } from '@testing-library/react-native';
import RiderInfo from '../../../src/components/RideDetail/RiderInfo';

describe('RiderInfo (driver info)', () => {
  const driver = { firstName: 'Joe', lastName: 'Doe', photoURL: null };
  const ride = { price: 12.5 };
  it('renders name and price', () => {
    const { getByText, getByRole } = render(
      <RiderInfo driver={driver} ride={ride} />
    );
    expect(getByText('Joe Doe')).toBeTruthy();
    expect(getByText('€12.5')).toBeTruthy();
  });
});
