
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';


jest.mock('../../../src/services/firebase', () => ({
  auth: { currentUser: { uid: 'user123' } },
  db: {},
}));


const mockCollection   = jest.fn();
const mockQuery        = jest.fn();
const mockWhere        = jest.fn();
const mockOrderBy      = jest.fn();
const mockOnSnapshot   = jest.fn();
const mockGetDoc       = jest.fn();
const mockDocFn        = jest.fn();

jest.mock('firebase/firestore', () => ({
  collection:   (...args) => mockCollection(...args),
  query:        (...args) => mockQuery(...args),
  where:        (...args) => mockWhere(...args),
  orderBy:      (...args) => mockOrderBy(...args),
  onSnapshot:   (...args) => mockOnSnapshot(...args),
  getDoc:       (...args) => mockGetDoc(...args),
  doc:          (...args) => mockDocFn(...args),
}));


jest.mock('../../../src/components/myStatusBar', () => () => null);

jest.mock('../../../src/components/RideHistory/RidesHeader', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return props => React.createElement(Text, { testID: 'header' }, 'Header');
});

jest.mock('../../../src/components/RideHistory/EmptyRideList', () => {
  const React = require('react');
  const { View } = require('react-native');
  return () => React.createElement(View, { testID: 'empty' });
});

jest.mock('../../../src/components/RideHistory/RideHistoryList', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return props => React.createElement(
    View,
    { testID: 'list' },
    React.createElement(Text, { testID: 'item-count' }, String(props.rides.length))
  );
});


import RideHistoryScreen from '../../../src/screens/TemplateProfile/rideHistory/rideHistoryScreen';

describe('<RideHistoryScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOnSnapshot.mockImplementation((q, cb) => {
      cb({ docs: [] });
      return () => {};
    });
    mockGetDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ firstName: 'Alice', lastName: 'Smith', photoURL: null }),
    });
  });

  it('shows empty list if no user', () => {
    jest.doMock('../../../src/services/firebase', () => ({
      auth: { currentUser: null },
      db: {},
    }));
    const Screen = require('../../../src/screens/TemplateProfile/rideHistory/rideHistoryScreen').default;
    const { getByTestId } = render(<Screen navigation={{ navigate: jest.fn() }} />);
    expect(getByTestId('empty')).toBeTruthy();
  });

  it('shows empty list when user but no rides', async () => {
    mockOnSnapshot.mockImplementation((q, cb) => {
      cb({ docs: [] });
      return () => {};
    });

    const { getByTestId } = render(<RideHistoryScreen navigation={{ navigate: jest.fn() }} />);
    await waitFor(() => {
      expect(getByTestId('empty')).toBeTruthy();
    });
  });

});