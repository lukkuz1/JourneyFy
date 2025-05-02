import React from 'react';
import { render } from '@testing-library/react-native';
import PassengerDetail from '../../../src/components/RideDetail/PassengerDetail';
import * as firestore from 'firebase/firestore';
import { db } from '../../../src/services/firebase';

jest.mock('../../../src/services/firebase', () => ({
  db: {},
}));
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  onSnapshot: jest.fn((q, cb) => {
    // immediately invoke with empty snapshot
    cb({ docs: [] });
    return () => {};
  }),
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

describe('PassengerDetail', () => {
  it('renders header and empty list when no approved registrations', () => {
    const { getByText, queryAllByTestId } = render(
      <PassengerDetail rideId="ride123" />
    );
    expect(getByText('Patvirtinti keleiviai')).toBeTruthy();
    // no user rows
    expect(queryAllByTestId('passenger-row')).toHaveLength(0);
  });
});
