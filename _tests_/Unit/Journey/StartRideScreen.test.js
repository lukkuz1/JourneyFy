// _tests_/Unit/Journey/StartRideScreen.test.js
import React from 'react';
import { render, act } from '@testing-library/react-native';
import { Alert } from 'react-native';

// 1) Stub firebase and Firestore
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

// 2) Stub navigation.replace
const mockReplace = jest.fn();

// 3) Stub components
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

// 4) Import the screen under test (TemplateJourney path)
import StartRideScreen from '../../../src/screens/TemplateJourney/startRide/startRideScreen';

describe('<StartRideScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default onSnapshot just returns an unsubscribe
    mockOnSnapshot.mockImplementation((ref, next) => {
      // no-op subscription
      return () => {};
    });
    // Silence native alerts
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
    // should call doc then onSnapshot
    expect(mockDoc).toHaveBeenCalledWith({}, 'journeys', 'R1');
    expect(mockOnSnapshot).toHaveBeenCalled();
  });
});