import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RideItem from '../../../src/components/Rides/RideItem';

// mock icons and dashed line
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-dashed-line', () => 'DashedLine');

describe('RideItem', () => {
  const item = {
    id: '1',
    name: 'Alice',
    profile: { uri: 'https://example.com/avatar.png' },
    car: 'Toyota',
    date: '2023-06-01',
    time: '10:00',
    pickup: 'A Street',
    drop: 'B Avenue',
    price: '20',
    __raw: {}, // not used in this test
  };
  const navigation = { navigate: jest.fn() };

  it('renders all fields correctly', () => {
    const { getByText, getByRole } = render(
      <RideItem item={item} navigation={navigation} />
    );

    expect(getByText('Alice')).toBeTruthy();
    expect(getByText('Modelis: Toyota')).toBeTruthy();
    expect(getByText('2023-06-01')).toBeTruthy();
    expect(getByText('10:00')).toBeTruthy();
    expect(getByText('A Street')).toBeTruthy();
    expect(getByText('B Avenue')).toBeTruthy();
    expect(getByText('€20')).toBeTruthy();
    expect(getByRole('image')).toBeTruthy();
  });

  it('navigates on press', () => {
    const { getByTestId, getByText } = render(
      <RideItem item={item} navigation={navigation} />
    );
    // find the TouchableOpacity by matching the name text
    const touchable = getByText('Alice').parent;
    fireEvent.press(touchable);
    expect(navigation.navigate).toHaveBeenCalledWith('RideDetailScreen', {
      ride: { id: '1', ...item.__raw },
    });
  });
});
