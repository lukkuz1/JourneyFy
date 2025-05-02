import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RideHistoryItem from '../../../src/components/RideHistory/RideHistoryItem';

describe('RideHistoryItem', () => {
  const mockNav = { navigate: jest.fn() };
  const item = {
    id: '1',
    profile: require('../../src/assets/images/user/user1.jpeg'),
    name: 'John Doe',
    date: '01 Jan',
    time: '12:34',
    pickup: 'Point A',
    drop: 'Point B',
  };

  it('displays all ride details and navigates on press', () => {
    const { getByText, getByTestId } = render(
      <RideHistoryItem item={item} navigation={mockNav} />
    );

    // Name, date, time
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('01 Jan')).toBeTruthy();
    expect(getByText('12:34')).toBeTruthy();

    // Pickup & drop
    expect(getByText('Point A')).toBeTruthy();
    expect(getByText('Point B')).toBeTruthy();

    // Press navigates
    fireEvent.press(getByTestId('ride-item-touchable'));
    expect(mockNav.navigate).toHaveBeenCalledWith('HistoryRideDetailScreen', { ride: item });
  });
});
