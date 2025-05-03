// _tests_/Unit/Journey/RideDetailScreen.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';

// 1) Mock firebase.auth.currentUser and db
const mockCurrentUser = { uid: 'user42' };
jest.mock('../../../src/services/firebase', () => ({
  auth: { currentUser: mockCurrentUser },
  db: {},
}));

// 2) Mock Firestore functions
const mockDoc = jest.fn();
const mockCollection = jest.fn();
const mockGetDoc = jest.fn();
const mockSetDoc = jest.fn();
const mockUpdateDoc = jest.fn();
const mockDeleteDoc = jest.fn();
const mockServerTimestamp = jest.fn().mockReturnValue({ ts: true });
const mockArrayUnion = jest.fn().mockReturnValue({ u: true });
const mockArrayRemove = jest.fn().mockReturnValue({ r: true });
const mockIncrement = jest.fn().mockReturnValue({ inc: true });

jest.mock('firebase/firestore', () => ({
  doc:          (...args) => mockDoc(...args),
  collection:   (...args) => mockCollection(...args),
  getDoc:       (...args) => mockGetDoc(...args),
  setDoc:       (...args) => mockSetDoc(...args),
  updateDoc:    (...args) => mockUpdateDoc(...args),
  deleteDoc:    (...args) => mockDeleteDoc(...args),
  serverTimestamp: () => mockServerTimestamp(),
  arrayUnion:   (...args) => mockArrayUnion(...args),
  arrayRemove:  (...args) => mockArrayRemove(...args),
  increment:    (...args) => mockIncrement(...args),
}));

// 3) Stub useDriver hook
jest.mock('../../../src/hooks/useDriver', () => () => ({ name: 'Drv' }));

// 4) Stub all child components & footer to expose three buttons
jest.mock('../../../src/components/myStatusBar',       () => () => null);
jest.mock('../../../src/components/RideDetail/RideDetailHeader', () => () => null);
jest.mock('../../../src/components/RideDetail/RiderInfo',         () => () => null);
jest.mock('../../../src/components/RideDetail/RiderDetail',       () => () => null);
jest.mock('../../../src/components/RideDetail/PassengerDetail',   () => () => null);
jest.mock('../../../src/components/RideDetail/VehicleInfo',       () => () => null);
jest.mock(
  '../../../src/components/RideDetail/RideDetailFooter',
  () => props => {
    const React = require('react');
    const { View, Button } = require('react-native');
    return React.createElement(View, null, [
      React.createElement(Button, {
        key: 'cancel',
        testID: 'btn-cancel',
        title: 'Cancel',
        onPress: props.onCancelPress,
      }),
      React.createElement(Button, {
        key: 'register',
        testID: 'btn-register',
        title: 'Register',
        onPress: props.onRegisterPress,
      }),
      React.createElement(Button, {
        key: 'delete',
        testID: 'btn-delete',
        title: 'Delete',
        onPress: props.onDeletePress,
      }),
    ]);
  }
);
jest.mock(
  '../../../src/components/RideDetail/CancelRideDialog',
  () => props => {
    const React = require('react');
    const { View, Button } = require('react-native');
    // always visible for testing
    return React.createElement(View, null, [
      React.createElement(Button, {
        key: 'confirm',
        testID: props.title.includes('registracij') ? 'confirm-cancel' : 'confirm-delete',
        title: 'OK',
        onPress: props.onConfirm,
      }),
      React.createElement(Button, {
        key: 'close',
        testID: props.title.includes('registracij') ? 'close-cancel' : 'close-delete',
        title: 'Close',
        onPress: props.onClose,
      }),
    ]);
  }
);

// 5) Import component under test
import RideDetailScreen from '../../../src/screens/TemplateJourney/rideDetail/rideDetailScreen';

describe('<RideDetailScreen />', () => {
  const fakeRide = {
    id: 'R1',
    userId: 'driver1',
    passengers: ['user42'],
    seats: 0,
  };
  let navigation;

  beforeEach(() => {
    jest.clearAllMocks();
    // default getDoc for registration snapshot:
    mockGetDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ approvedByRider: true }),
    });
    navigation = { navigate: jest.fn(), goBack: jest.fn(), popToTop: jest.fn() };
    // silence native alert
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });


  it('deletes the journey: deleteDoc, alert & popToTop', async () => {
    const { getByTestId } = render(
      <RideDetailScreen navigation={navigation} route={{ params: { ride: fakeRide } }} />
    );

    fireEvent.press(getByTestId('btn-delete'));
    fireEvent.press(getByTestId('confirm-delete'));
    await waitFor(() => {
      expect(mockDeleteDoc).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith('Kelionė pašalinta');
      expect(navigation.popToTop).toHaveBeenCalled();
    });
  });

  it('navigates to Login when registering while unauthenticated', async () => {
    // override user to null
    jest.doMock('../../../src/services/firebase', () => ({
      auth: { currentUser: null },
      db: {},
    }));
    const Screen = require('../../../src/screens/TemplateJourney/rideDetail/rideDetailScreen').default;
    const { getByTestId } = render(
      <Screen navigation={navigation} route={{ params: { ride: fakeRide } }} />
    );
    fireEvent.press(getByTestId('btn-register'));
    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('Login');
    });
  });
});
