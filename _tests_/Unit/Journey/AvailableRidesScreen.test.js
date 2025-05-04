import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';

jest.mock('react-native-dashed-line', () => {
  const React = require('react');
  return props => React.createElement('View', props, null);
});
jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const React = require('react');
  return props => React.createElement('View', props, null);
});

jest.mock('../../../src/components/myStatusBar', () => () => null);

jest.mock('../../../src/components/header', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return props => React.createElement(Text, { testID: 'header' }, props.title);
});

const mockGetDoc = jest.fn();
const mockDoc    = jest.fn();
const mockDb     = {};
jest.mock('firebase/firestore', () => ({
  getFirestore: () => mockDb,
  doc: (...args) => mockDoc(...args),
  getDoc: (...args) => mockGetDoc(...args),
}));

import AvailableRidesScreen from '../../../src/screens/TemplateJourney/availableRides/availableRidesScreen';

describe('<AvailableRidesScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
              { ...rideWithSeats, seats: 0 },
              rideWithSeats,
            ],
          },
        }}
      />
    );

    await waitFor(() => {
      expect(queryByText('FromX')).toBeTruthy();
      expect(queryByText('ToY')).toBeTruthy();
    });

    expect(getByTestId('header').props.children).toBe('Surastos kelionės');

    await waitFor(() => {
      expect(getByText('Alice Smith')).toBeTruthy();
    });

    expect(getByText('$42')).toBeTruthy();

    fireEvent.press(getByText('FromX'));
    expect(navigate).toHaveBeenCalledWith('RideDetailScreen', { ride: rideWithSeats });
  });
});