import React from 'react';
import { render, act } from '@testing-library/react-native';
import { Alert } from 'react-native';

jest.mock('../../../src/services/firebase', () => ({
  db: {},
}));
const mockDoc = jest.fn();
const mockOnSnapshot = jest.fn();
jest.mock('firebase/firestore', () => ({
  doc: (...args) => mockDoc(...args),
  onSnapshot: (...args) => mockOnSnapshot(...args),
  collection: () => {}, // unused
  query: () => {},      // unused
  where: () => {},      // unused
  getDoc: () => {},     // unused
}));

const mockReplace = jest.fn();

jest.mock('../../../src/components/myStatusBar', () => () => null);
jest.mock('../../../src/components/header', () => props => {
  const React = require('react');
  const { Text } = require('react-native');
  return <Text testID="header">{props.title}</Text>;
});
jest.mock('../../../src/components/StartRide/DirectionInfo', () => () => {
  const React = require('react');
  const { View } = require('react-native');
  return <View testID="dir-info" />;
});
jest.mock('../../../src/components/StartRide/RideInfoSheet', () => () => {
  const React = require('react');
  const { View } = require('react-native');
  return <View testID="sheet" />;
});
jest.mock('../../../src/components/StartRide/StartRideButton', () => props => {
  const React = require('react');
  const { Button } = require('react-native');
  return <Button testID="start-button" title="Start" onPress={() => props.navigation.replace && props.navigation.replace()} />;
});

import StartRideScreen from '../../../src/screens/TemplateJourney/startRide/startRideScreen';

describe('<StartRideScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOnSnapshot.mockImplementation((ref, next) => {
      return () => {};
    });
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  it('renders header, direction info, sheet & button', () => {
    const { getByTestId } = render(
      <StartRideScreen
        navigation={{ replace: mockReplace }}
        route={{ params: {} }}
      />
    );
    expect(getByTestId('header').props.children).toBe('Kelionės pradžia');
    expect(getByTestId('dir-info')).toBeTruthy();
    expect(getByTestId('sheet')).toBeTruthy();
    expect(getByTestId('start-button')).toBeTruthy();
  });

  it('does not subscribe when no ride.id', () => {
    render(
      <StartRideScreen
        navigation={{ replace: mockReplace }}
        route={{ params: { ride: {} } }}
      />
    );
    expect(mockDoc).not.toHaveBeenCalled();
    expect(mockOnSnapshot).not.toHaveBeenCalled();
  });

  it('subscribes when ride.id present', () => {
    const ride = { id: 'R1', status: 'pending' };
    render(
      <StartRideScreen
        navigation={{ replace: mockReplace }}
        route={{ params: { ride } }}
      />
    );
    expect(mockDoc).toHaveBeenCalledWith({}, 'journeys', 'R1');
    expect(mockOnSnapshot).toHaveBeenCalled();
  });
});