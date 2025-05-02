import React from 'react';
import { render } from '@testing-library/react-native';
import DirectionInfo from '../../../src/components/StartRide/DirectionInfo';

describe('DirectionInfo', () => {
  it('returns null when no ride is passed', () => {
    const { toJSON } = render(<DirectionInfo ride={null} />);
    expect(toJSON()).toBeNull();
  });

  it('renders all fields correctly when ride is provided', () => {
    const ride = {
      pickup: 'Vilnius',
      drop: 'Kaunas',
      price: 12.5,
    };
    const { getByText } = render(<DirectionInfo ride={ride} />);
    // Header
    expect(getByText('Kelionės informacija')).toBeTruthy();
    // Pickup row
    expect(getByText('Iš:')).toBeTruthy();
    expect(getByText('Vilnius')).toBeTruthy();
    // Drop row
    expect(getByText('Į:')).toBeTruthy();
    expect(getByText('Kaunas')).toBeTruthy();
    // Price row
    expect(getByText('Kaina:')).toBeTruthy();
    expect(getByText('12.5 €')).toBeTruthy();
  });
});
