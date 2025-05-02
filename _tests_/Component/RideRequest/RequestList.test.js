import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RequestList from '../../../src/components/RideRequest/RequestList';

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-dashed-line', () => 'DashedLine');

describe('RequestList', () => {
  const navigation = { navigate: jest.fn() };
  const requests = [
    { 
      id: 'r1',
      createdAt: { seconds: 0 },
      pickup: 'P1',
      drop: 'D1',
      car: 'C1',
      price: '5',
      seats: '1',
      passengerList: [],
      requestCount: 0,
    },
    {
      id: 'r2',
      createdAt: { seconds: 0 },
      pickup: 'P2',
      drop: 'D2',
      car: 'C2',
      price: '10',
      seats: '2',
      passengerList: [],
      requestCount: 1,
    },
  ];
  const onRequestPress = jest.fn();

  it('renders one RequestItem per request and navigates onPress', () => {
    const { getByText } = render(
      <RequestList requests={requests} onRequestPress={onRequestPress} navigation={navigation} />
    );

    // It should render both requestCount buttons
    expect(getByText('Request(0)')).toBeTruthy();
    expect(getByText('Request(1)')).toBeTruthy();

    // Press the first item (touch the text inside)
    fireEvent.press(getByText('Automobilis:'));
    expect(navigation.navigate).toHaveBeenCalledWith('StartRideScreen', { ride: requests[0] });

    // Press the sheet button of the second item
    fireEvent.press(getByText('Request(1)'));
    expect(onRequestPress).toHaveBeenCalledWith(requests[1]);
  });
});
