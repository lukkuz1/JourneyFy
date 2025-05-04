import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('../../../src/services/firebase', () => ({
  db: {},
  auth: { currentUser: null },
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  onSnapshot: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(),
}));


jest.mock('../../../src/components/myStatusBar', () => () => null);
jest.mock('../../../src/components/Rides/RidesHeader',  () => () => null);
jest.mock('../../../src/components/Rides/NoRidesInfo',   () => {
  const React = require('react');
  const { View } = require('react-native');
  return () => React.createElement(View, { testID: 'no-rides' }, null);
});
jest.mock('../../../src/components/Rides/RidesList',     () => {
  const React = require('react');
  const { View } = require('react-native');
  return () => React.createElement(View, { testID: 'rides-list' }, null);
});


import RidesScreen from '../../../src/screens/Main/ridesScreen';

describe('RidesScreen component', () => {
  it('renders NoRidesInfo when no user is signed in', () => {
    const { getByTestId, queryByTestId } = render(
      <RidesScreen navigation={{ navigate: jest.fn() }} />
    );
    expect(getByTestId('no-rides')).toBeTruthy();
    expect(queryByTestId('rides-list')).toBeNull();
  });
});