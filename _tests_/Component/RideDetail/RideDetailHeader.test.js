import React from 'react';
import { render } from '@testing-library/react-native';
import RideDetailHeader from '../../../src/components/RideDetail/RideDetailHeader';

describe('RideDetailHeader', () => {
  it('renders the screen header', () => {
    const { getByText } = render(
      <RideDetailHeader navigation={{}} driver={null} />
    );
    // uses the shared <Header> titled "Kelionės aprašymas"
    expect(getByText('Kelionės aprašymas')).toBeTruthy();
  });
});
