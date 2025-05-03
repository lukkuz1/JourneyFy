// _tests_/Unit/Journey/AvailableRidesScreen.test.js

import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';

// 0) Stub out any native modules that use ESM-only syntax:
jest.mock('react-native-dashed-line', () => {
  const React = require('react');
  return props => React.createElement('View', props, null);
});
jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const React = require('react');
  return props => React.createElement('View', props, null);
});

// 1) Stub MyStatusBar
jest.mock('../../../src/components/myStatusBar', () => () => null);

// 2) Stub Header via React.createElement
jest.mock('../../../src/components/header', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return props => React.createElement(Text, { testID: 'header' }, props.title);
});

// 3) Mock Firestore functions
const mockGetDoc = jest.fn();
const mockDoc    = jest.fn();
const mockDb     = {};
jest.mock('firebase/firestore', () => ({
  getFirestore: () => mockDb,
  doc: (...args) => mockDoc(...args),
  getDoc: (...args) => mockGetDoc(...args),
}));

// 4) Now import the screen under test
import AvailableRidesScreen from '../../../src/screens/TemplateJourney/availableRides/availableRidesScreen';

describe('<AvailableRidesScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default Firestore mock returns a driver profile
    mockGetDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ firstName: 'Alice', lastName: 'Smith', photoURL: 'http://x' }),
    });
  });

  it('shows "no rides" when passed an empty journeys array', () => {
    const { getByText } = render(
      <AvailableRidesScreen
        navigation={{ navigate: jest.fn() }}
        route={{ params: { journeys: [] } }}
      />
    );
    expect(getByText('Nerasta jokių laisvų kelionių.')).toBeTruthy();
  });

  it('filters out zero-seat rides, displays the rest, fetches driver & navigates on press', async () => {
    const rideWithSeats = {
      id: 'ride1',
      seats: 2,
      pickupAddress: 'FromX',
      destinationAddress: 'ToY',
      amount: 42,
      userId: 'u1',
      journeyDateTime: '2025-12-01 09:30',
    };
    const navigate = jest.fn();

    const { getByText, getByTestId, queryByText } = render(
      <AvailableRidesScreen
        navigation={{ navigate }}
        route={{
          params: {
            journeys: [
              { ...rideWithSeats, seats: 0 }, // should be filtered out
              rideWithSeats,
            ],
          },
        }}
      />
    );

    // We should eventually see the valid ride’s pickup and drop
    await waitFor(() => {
      expect(queryByText('FromX')).toBeTruthy();
      expect(queryByText('ToY')).toBeTruthy();
    });

    // Header stub
    expect(getByTestId('header').props.children).toBe('Surastos kelionės');

    // After fetch, driver’s name appears
    await waitFor(() => {
      expect(getByText('Alice Smith')).toBeTruthy();
    });

    // And amount
    expect(getByText('$42')).toBeTruthy();

    // Tapping the pickup text navigates
    fireEvent.press(getByText('FromX'));
    expect(navigate).toHaveBeenCalledWith('RideDetailScreen', { ride: rideWithSeats });
  });
});