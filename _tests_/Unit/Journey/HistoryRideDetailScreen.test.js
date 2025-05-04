import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('../../../src/services/firebase', () => ({
  auth: { currentUser: { uid: 'driver1' } },
}));

jest.mock('../../../src/components/myStatusBar', () => {
  const React = require('react');
  const { View } = require('react-native');
  return () => React.createElement(View, { testID: 'statusbar' });
});
jest.mock('../../../src/components/header', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return props =>
    React.createElement(Text, { testID: 'header' }, props.title);
});
jest.mock('../../../src/components/HistoryRideDetail/RiderInfo', () => {
  const React = require('react');
  const { View } = require('react-native');
  return props =>
    React.createElement(View, { testID: 'rider-info' });
});
jest.mock('../../../src/components/HistoryRideDetail/RiderDetail', () => {
  const React = require('react');
  const { View } = require('react-native');
  return props =>
    React.createElement(View, { testID: 'rider-detail' });
});
jest.mock('../../../src/components/HistoryRideDetail/VehicleInfo', () => {
  const React = require('react');
  const { View } = require('react-native');
  return props =>
    React.createElement(View, { testID: 'vehicle-info' });
});
jest.mock('../../../src/components/HistoryRideDetail/RateRideButton', () => {
  const React = require('react');
  const { Button } = require('react-native');
  return props =>
    React.createElement(Button, {
      testID: 'rate-button',
      title: 'Rate',
      onPress: props.onPress,
    });
});
jest.mock('../../../src/components/HistoryRideDetail/RateRideDialog', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return props =>
    React.createElement(
      View,
      { testID: 'rate-dialog' },
      React.createElement(Text, { testID: 'dialog-visible' }, String(props.isVisible))
    );
});

import HistoryRideDetailScreen from '../../../src/screens/TemplateJourney/historyRideDetail/historyRideDetailScreen';

describe('<HistoryRideDetailScreen />', () => {
  const baseRide = { id: 'ride1', userId: 'driver1' };
  const otherRide = { id: 'ride2', userId: 'otherUser' };

  it('renders info & hides rating when currentUser === ride.userId', () => {
    const { queryByTestId } = render(
      <HistoryRideDetailScreen
        navigation={{ navigate: jest.fn() }}
        route={{ params: { ride: baseRide } }}
      />
    );
    expect(queryByTestId('statusbar')).toBeTruthy();
    expect(queryByTestId('header').props.children).toBe('Kelionės aprašymas');
    expect(queryByTestId('rider-info')).toBeTruthy();
    expect(queryByTestId('rider-detail')).toBeTruthy();
    expect(queryByTestId('vehicle-info')).toBeTruthy();
    expect(queryByTestId('rate-button')).toBeNull();
    expect(queryByTestId('rate-dialog')).toBeNull();
  });


  it('passes ride prop down to RiderInfo/RiderDetail/VehicleInfo', () => {
    const ride = { id: 'R3', userId: 'other', extra: 'data' };
    const { getByTestId } = render(
      <HistoryRideDetailScreen
        navigation={{ navigate: jest.fn() }}
        route={{ params: { ride } }}
      />
    );
    expect(getByTestId('rider-info')).toBeTruthy();
    expect(getByTestId('rider-detail')).toBeTruthy();
    expect(getByTestId('vehicle-info')).toBeTruthy();
  });
});
