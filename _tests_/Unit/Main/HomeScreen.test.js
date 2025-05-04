import React from 'react';
import { act } from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react-native';


const mockNavigate = jest.fn();
const mockRoute = { params: { address: 'A1', addressFor: 'pickup' } };
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('firebase/auth', () => ({
  getAuth: () => ({}),
}));


const mockCreateJourney = jest.fn();
jest.mock('../../../src/hooks/useCreateJourney', () => () => ({
  createJourney: mockCreateJourney,
}));
const mockFindMatching = jest.fn();
jest.mock('../../../src/hooks/useFindMatchingJourneys', () => () => ({
  findMatchingJourneys: mockFindMatching,
}));
jest.mock('../../../src/hooks/useLocation', () => ({
  useLocation: () => 'TestCountry',
}));


jest.mock(
  '../../../src/components/Home/Header',
  () => {
    const React = require('react');
    const { Text } = require('react-native');
    return props => React.createElement(Text, { testID: 'header' }, props.location);
  }
);
jest.mock(
  '../../../src/components/Home/MapComponent',
  () => {
    const React = require('react');
    const { View } = require('react-native');
    return () => React.createElement(View, { testID: 'map' });
  }
);
jest.mock(
  '../../../src/components/Home/DateTimePickerSheet',
  () => {
    const React = require('react');
    const { Button } = require('react-native');
    return props =>
      React.createElement(Button, {
        testID: 'dt-confirm',
        title: 'OK',
        onPress: () => props.onConfirm('2025-01-01T10:00'),
      });
  }
);
jest.mock(
  '../../../src/components/Home/NoOfSeatSheet',
  () => {
    const React = require('react');
    const { View } = require('react-native');
    return props => React.createElement(View, { testID: 'seat-sheet' });
  }
);
jest.mock(
  '../../../src/components/myStatusBar',
  () => {
    const React = require('react');
    const { View } = require('react-native');
    return () => React.createElement(View, { testID: 'statusbar' });
  }
);
jest.mock(
  '../../../src/components/Home/RideInfoCard',
  () => {
    const React = require('react');
    const { View, Text, Button } = require('react-native');
    return props =>
      React.createElement(View, null, [
        React.createElement(Text, { key: 'pickup', testID: 'pickupAddress' }, props.pickupAddress),
        React.createElement(Text, { key: 'dest', testID: 'destinationAddress' }, props.destinationAddress),
        React.createElement(Text, { key: 'datetime', testID: 'datetime' }, props.selectedDateAndTime),
        React.createElement(Text, { key: 'tab', testID: 'tabIndex' }, String(props.selectedTabIndex)),
        React.createElement(Text, { key: 'alert', testID: 'pickAlert' }, String(props.pickAlert)),
        React.createElement(Button, {
          key: 'submit',
          testID: 'onSubmit',
          title: 'Submit',
          onPress: props.onSubmit,
        }),
        React.createElement(Button, {
          key: 'tab2',
          testID: 'set-tab-2',
          title: 'Tab2',
          onPress: () => props.setselectedTabIndex(2),
        }),
        React.createElement(Button, {
          key: 'datePress',
          testID: 'datePress',
          title: 'Date',
          onPress: props.onDateTimePress,
        }),
      ]);
  }
);


import HomeScreen from '../../../src/screens/Main/homeScreen';

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockFindMatching.mockResolvedValue(['J1']);
  });

  it('initializes pickup from route.params', () => {
    const { getByTestId } = render(
      <HomeScreen navigation={{ navigate: mockNavigate }} route={mockRoute} />
    );
    expect(getByTestId('pickupAddress').props.children).toBe('A1');
    expect(getByTestId('destinationAddress').props.children).toBe('');
  });

  it('handles date-time confirm', () => {
    const { getByTestId } = render(
      <HomeScreen navigation={{ navigate: mockNavigate }} route={{}} />
    );
    fireEvent.press(getByTestId('datePress'));
    fireEvent.press(getByTestId('dt-confirm'));
    expect(getByTestId('datetime').props.children).toBe('2025-01-01T10:00');
  });

  it('alerts pickAlert when submitting with missing fields and resets after timeout', () => {
    const { getByTestId } = render(
      <HomeScreen navigation={{ navigate: mockNavigate }} route={{}} />
    );
    fireEvent.press(getByTestId('onSubmit'));
    expect(getByTestId('pickAlert').props.children).toBe('true');

    act(() => {
      jest.runAllTimers();
    });
    expect(getByTestId('pickAlert').props.children).toBe('false');
  });

  it('navigates to AvailableRidesScreen when matches found', async () => {
    const route1 = { params: { address: 'P', addressFor: 'pickup' } };
    const { getByTestId, rerender } = render(
      <HomeScreen navigation={{ navigate: mockNavigate }} route={route1} />
    );
    const route2 = { params: { address: 'D', addressFor: 'dropoff' } };
    rerender(
      <HomeScreen navigation={{ navigate: mockNavigate }} route={route2} />
    );
    fireEvent.press(getByTestId('datePress'));
    fireEvent.press(getByTestId('dt-confirm'));

    await waitFor(() => {
      fireEvent.press(getByTestId('onSubmit'));
    });

    expect(mockFindMatching).toHaveBeenCalledWith({
      pickupAddress: 'P',
      destinationAddress: 'D',
      journeyDateTime: '2025-01-01T10:00',
      seats: 1,
    });
    expect(mockNavigate).toHaveBeenCalledWith('AvailableRidesScreen', {
      journeys: ['J1'],
    });
  });
});