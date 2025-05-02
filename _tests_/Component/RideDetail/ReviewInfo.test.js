import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ReviewInfo from '../../../src/components/RideDetail/ReviewInfo';

describe('ReviewInfo', () => {
  const fakeRide = { id: 'r1' };
  const navigation = { navigate: jest.fn() };

  it('renders two reviews and navigates on "Peržiūrėti visus"', () => {
    const { getByText, getAllByTestId } = render(
      <ReviewInfo ride={fakeRide} navigation={navigation} />
    );
    // Section header
    expect(getByText('Atsiliepimas')).toBeTruthy();
    // Two names
    expect(getByText('Wade Warren')).toBeTruthy();
    expect(getByText('Jenny Wilson')).toBeTruthy();

    // Press "Peržiūrėti visus"
    fireEvent.press(getByText('Peržiūrėti visus'));
    expect(navigation.navigate).toHaveBeenCalledWith('ReviewsScreen', { rideId: 'r1' });
  });
});
