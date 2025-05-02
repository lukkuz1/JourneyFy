import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RidesList from '../../../src/components/Rides/RidesList';

// mock RideItem so we can intercept its onPress
jest.mock('../src/components/RideItem', () => {
  return ({ item, navigation }) => (
    <Text testID={`ride-${item.id}`} onPress={() => navigation.navigate('RideDetailScreen', { ride: item })}>
      {item.name}
    </Text>
  );
});

describe('RidesList', () => {
  const rides = [
    { id: 'r1', name: 'Alice' },
    { id: 'r2', name: 'Bob' },
  ];
  const navigation = { navigate: jest.fn() };

  it('renders a list of rides and handles press', () => {
    const { getByTestId } = render(
      <RidesList rides={rides} navigation={navigation} />
    );

    // Both items should be present
    expect(getByTestId('ride-r1')).toBeTruthy();
    expect(getByTestId('ride-r2')).toBeTruthy();

    // Press the first one
    fireEvent.press(getByTestId('ride-r1'));
    expect(navigation.navigate).toHaveBeenCalledWith('RideDetailScreen', { ride: rides[0] });
  });
});
