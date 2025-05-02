import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RequestItem from '../../../src/components/RideRequest/RequestItem';

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-dashed-line', () => 'DashedLine');

describe('RequestItem', () => {
  const baseItem = {
    createdAt: { seconds: 0 },
    pickup: 'Start St.',
    drop: 'End Ave.',
    car: 'Tesla',
    price: '15',
    seats: '3',
    passengerList: [
      { id: 'p1', profile: { uri: 'u1' } },
      { id: 'p2', profile: { uri: 'u2' } },
    ],
    requestCount: 2,
  };

  it('renders pickup, drop, car, price, seats and request count', () => {
    const onPress = jest.fn();
    const onRequestSheetPress = jest.fn();
    const { getByText, getAllByRole } = render(
      <RequestItem
        item={baseItem}
        onPress={onPress}
        onRequestSheetPress={onRequestSheetPress}
      />
    );

    // Journey details
    expect(getByText('Automobilis:')).toBeTruthy();
    expect(getByText('Tesla')).toBeTruthy();
    expect(getByText('Kaina:')).toBeTruthy();
    expect(getByText('15 €')).toBeTruthy();
    expect(getByText('Vietų liko:')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();

    // Pickup & drop
    expect(getByText('Start St.')).toBeTruthy();
    expect(getByText('End Ave.')).toBeTruthy();

    // Request count button
    expect(getByText('Request(2)')).toBeTruthy();

    // Passenger avatars: 2 images rendered
    const images = getAllByRole('image');
    expect(images).toHaveLength(2 + 1 /* possible map icon image */);
  });

  it('calls onPress and onRequestSheetPress when tapped', () => {
    const onPress = jest.fn();
    const onRequestSheetPress = jest.fn();
    const { getByTestId, getByText } = render(
      <RequestItem
        item={baseItem}
        onPress={onPress}
        onRequestSheetPress={onRequestSheetPress}
      />
    );

    // The root TouchableOpacity should call onPress
    const touchable = getByText('Automobilis:').parent; 
    fireEvent.press(touchable);
    expect(onPress).toHaveBeenCalled();

    // The Request(...) button
    const reqButton = getByText('Request(2)');
    fireEvent.press(reqButton);
    expect(onRequestSheetPress).toHaveBeenCalledWith(baseItem);
  });
});
