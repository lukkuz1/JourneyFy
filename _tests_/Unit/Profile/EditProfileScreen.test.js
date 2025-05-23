
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';


jest.mock('firebase/auth', () => ({
  getAuth: () => ({ currentUser: { uid: 'u1', photoURL: 'url1' } }),
}));
jest.mock('firebase/firestore', () => ({
  Timestamp: { fromDate: jest.fn(d => ({ ts: d.getTime() })) },
}));


const mockFetch = jest.fn();
const mockInit  = jest.fn();
const mockUpdate = jest.fn();
jest.mock('../../../src/services/firebaseUserService', () => ({
  fetchUserProfile: (uid, pop, init) => mockFetch(uid, pop, init),
  initializeUserProfile: mockInit,
  updateProfileInFirestore: mockUpdate,
}));


jest.mock('../../../src/components/LoadingIndicator', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return () => React.createElement(Text, { testID: 'loading' }, 'Loading');
});
jest.mock('../../../src/components/myStatusBar', () => () => null);
jest.mock('../../../src/components/header', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return props =>
    React.createElement(Text, { testID: 'header' }, props.title);
});
jest.mock('../../../src/components/Profile/ProfilePicture', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return props =>
    React.createElement(Text, { testID: 'picture' }, props.profilePhoto);
});
jest.mock('../../../src/components/Profile/ProfileInputField', () => {
  const React = require('react');
  const { View, Text, TextInput } = require('react-native');
  const real = jest.requireActual(
    '../../../src/components/Profile/ProfileInputField'
  );
  return {
    __esModule: true,
    default: props =>
      React.createElement(
        View,
        { testID: `field-${props.label}` },
        React.createElement(Text, null, props.label),
        React.createElement(TextInput, {
          testID: `input-${props.label}`,
          value: props.value,
          onChangeText: props.setter,
        })
      ),
    validateName: real.validateName,
    validatePhoneNumber: real.validatePhoneNumber,
    validateDateOfBirth: real.validateDateOfBirth,
  };
});
jest.mock('../../../src/components/Profile/UpdateButton', () => {
  const React = require('react');
  const { Text, TouchableOpacity } = require('react-native');
  return props =>
    React.createElement(
      TouchableOpacity,
      { testID: 'btn-update', onPress: props.onPress },
      React.createElement(Text, null, 'Update')
    );
});


jest.spyOn(Alert, 'alert').mockImplementation(() => {});


import EditProfileScreen from '../../../src/screens/TemplateProfile/editProfile/editProfileScreen';

describe('<EditProfileScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();


    mockFetch.mockImplementation((uid, populate) => {
      const data = {
        firstName: 'Jane',
        lastName: 'Smith',
        phoneNumber: '555-1234',
        dateOfBirth: { toDate: () => new Date('1990-02-15') },
        photoURL: 'pic.png',
      };
      populate(data);
      return Promise.resolve();
    });
  });

  it('renders loading then the populated form', async () => {
    const { getByTestId, queryByTestId } = render(<EditProfileScreen />);


    expect(getByTestId('loading')).toBeTruthy();


    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
      const [calledUid, calledPopulate] = mockFetch.mock.calls[0];
      expect(calledUid).toBe('u1');
      expect(typeof calledPopulate).toBe('function');
    });


    expect(queryByTestId('loading')).toBeNull();


    expect(getByTestId('header').props.children).toBe('Redaguoti Profilį');
    expect(getByTestId('input-Vardas').props.value).toBe('Jane');
    expect(getByTestId('input-Pavardė').props.value).toBe('Smith');
    expect(getByTestId('input-Telefonas').props.value).toBe('555-1234');
  });

  it('blocks submission on empty required fields', async () => {

    mockFetch.mockImplementation((uid, populate) => {
      populate({});
      return Promise.resolve();
    });

    const { getByTestId } = render(<EditProfileScreen />);
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());


    fireEvent.press(getByTestId('btn-update'));
    expect(Alert.alert).toHaveBeenCalledWith(
      'Validacijos klaida',
      'Prieš atnaujindami, ištaisykite klaidas.'
    );
    expect(mockUpdate).not.toHaveBeenCalled();
  });
});