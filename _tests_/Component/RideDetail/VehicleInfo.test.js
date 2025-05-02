import React from 'react';
import { render } from '@testing-library/react-native';
import VehicleInfo from '../../../src/components/RideDetail/VehicleInfo';

describe('VehicleInfo', () => {
  const ride = { car: 'Toyota', seats: 4, facilities: 'AC, Music' };
  it('renders model, seats and facilities', () => {
    const { getByText } = render(<VehicleInfo ride={ride} />);
    expect(getByText('Automobilio informacija')).toBeTruthy();
    expect(getByText('Modelis')).toBeTruthy();
    expect(getByText('Toyota')).toBeTruthy();
    expect(getByText('Vietų skaičius')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
    expect(getByText('Įranga')).toBeTruthy();
    expect(getByText('AC, Music')).toBeTruthy();
  });
});
