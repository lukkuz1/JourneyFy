import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  getCurrentPositionAsync: jest.fn().mockResolvedValue({
    coords: { latitude: 10, longitude: 20 },
  }),
}));

jest.mock('react-native-geocoding', () => ({
  init: jest.fn(),
  from: jest.fn().mockResolvedValue({
    results: [{ formatted_address: '123 Main St' }],
  }),
}));

jest.mock('../../../src/components/myStatusBar', () => () => null);

jest.mock(
  '../../../src/components/PickLocation/LocationSearchHeader',
  () => props => {
    const React = require('react');
    const { View, Button } = require('react-native');
    return React.createElement(
      View,
      { testID: 'search-header' },
      React.createElement(Button, {
        testID: 'btn-back',
        title: 'Back',
        onPress: props.onBackPress,
      })
    );
  }
);

jest.mock(
  '../../../src/components/PickLocation/PickLocationMap',
  () => props => {
    const React = require('react');
    const { View, Text } = require('react-native');
    return React.createElement(
      View,
      { testID: 'map' },
      React.createElement(
        Text,
        { testID: 'coords' },
        `${props.currentMarker.latitude},${props.currentMarker.longitude}`
      )
    );
  }
);

jest.mock(
  '../../../src/components/PickLocation/LocationFooter',
  () => props => {
    const React = require('react');
    const { View, Text, Button } = require('react-native');
    return React.createElement(
      View,
      { testID: 'footer' },
      React.createElement(Text, { testID: 'address' }, props.address),
      React.createElement(Button, {
        testID: 'btn-pick',
        title: 'Pick',
        onPress: props.onPickLocation,
      })
    );
  }
);

import PickLocationScreen from '../../../src/screens/TemplateJourney/pickLocation/pickLocationScreen';

describe('<PickLocationScreen />', () => {
  let mockNavigate, mockGoBack, route;
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate = jest.fn();
    mockGoBack = jest.fn();
    route = { params: { addressFor: 'pickup' } };
  });

  it('shows initial device coords and address', async () => {
    const { getByTestId } = render(
      <PickLocationScreen
        navigation={{ navigate: mockNavigate, goBack: mockGoBack }}
        route={route}
      />
    );
    await waitFor(() => {
      expect(getByTestId('coords').props.children).toBe('10,20');
      expect(getByTestId('address').props.children).toBe('123 Main St');
    });
  });

  it('handles back press', () => {
    const { getByTestId } = render(
      <PickLocationScreen
        navigation={{ navigate: mockNavigate, goBack: mockGoBack }}
        route={route}
      />
    );
    fireEvent.press(getByTestId('btn-back'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('picks location and navigates home', async () => {
    const { getByTestId } = render(
      <PickLocationScreen
        navigation={{ navigate: mockNavigate, goBack: mockGoBack }}
        route={route}
      />
    );
    await waitFor(() => {}); // wait for address
    fireEvent.press(getByTestId('btn-pick'));
    expect(mockNavigate).toHaveBeenCalledWith('HomeScreen', {
      address: '123 Main St',
      addressFor: 'pickup',
    });
  });
});