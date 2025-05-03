// _tests_/Unit/Profile/ProfileScreen.test.js
import React from 'react';
import { Text, View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// 1) Mock react-navigation so useFocusEffect and useNavigation don't crash
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: (callback) => {
    // call the effect immediately
    callback();
  },
  useNavigation: () => ({ navigate: jest.fn() }),
}));

// 2) Stub hooks
const mockFetchUserProfile = jest.fn();
const mockOnRefresh        = jest.fn();
jest.mock('../../../src/hooks/useUserProfile', () => ({
  useUserProfile: () => ({
    user:              { firstName: 'Jonas', lastName: 'Jonaitis', photoURL: 'url' },
    fetchUserProfile:  mockFetchUserProfile,
    refreshing:        false,
    onRefresh:         mockOnRefresh,
  }),
}));

const mockSignOut = jest.fn();
jest.mock('../../../src/hooks/useAuth', () => ({
  useAuth: () => ({ signOut: mockSignOut }),
}));

// 3) Stub visual components
jest.mock('../../../src/components/myStatusBar', () => () => null);

jest.mock('../../../src/components/Profile/Divider', () => {
  const React = require('react');
  const { View } = require('react-native');
  return () => React.createElement(View, { testID: 'divider' });
});

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return (props) =>
    React.createElement(Text, { testID: `icon-${props.name}`, onPress: props.onPress }, props.name);
});

jest.mock('../../../src/components/Profile/LogoutDialog', () => {
  const React = require('react');
  const { View, TouchableOpacity, Text } = require('react-native');
  return (props) =>
    React.createElement(
      View,
      { testID: 'logout-dialog', style: { display: props.isVisible ? 'flex' : 'none' } },
      React.createElement(
        TouchableOpacity,
        { testID: 'btn-confirm-logout', onPress: props.onLogout },
        React.createElement(Text, null, 'Confirm logout')
      ),
      React.createElement(
        TouchableOpacity,
        { testID: 'btn-cancel-logout', onPress: props.onClose },
        React.createElement(Text, null, 'Cancel')
      )
    );
});

// 4) Now import the screen under test
import ProfileScreen from '../../../src/screens/TemplateProfile/profile/profileScreen';

describe('<ProfileScreen />', () => {
  let navigation;
  beforeEach(() => {
    jest.clearAllMocks();
    navigation = { navigate: jest.fn() };
  });

  it('fetches profile on mount and displays user name/surname', () => {
    const { getByText } = render(<ProfileScreen navigation={navigation} />);
    expect(mockFetchUserProfile).toHaveBeenCalled();

    expect(getByText('Jonas')).toBeTruthy();
    expect(getByText('Jonaitis')).toBeTruthy();
  });

  it('calls onRefresh when pull-to-refresh triggered', () => {
    const { UNSAFE_getByType } = render(<ProfileScreen navigation={navigation} />);
    const scroll = UNSAFE_getByType(ScrollView);
    // simulate pull-to-refresh
    scroll.props.refreshControl.props.onRefresh();
    expect(mockOnRefresh).toHaveBeenCalled();
  });

  it('navigates to EditProfileScreen on edit icon press', () => {
    const { getByTestId } = render(<ProfileScreen navigation={navigation} />);
    fireEvent.press(getByTestId('icon-square-edit-outline'));
    expect(navigation.navigate).toHaveBeenCalledWith('EditProfileScreen');
  });

  it('navigates to each option correctly', () => {
    const { getByText } = render(<ProfileScreen navigation={navigation} />);
    const cases = [
      ['Mano automobilis', 'UserVehiclesScreen'],
      ['Kelionių istoriją',  'RideHistoryScreen'],
      ['Nustatymai',         'Settings'],
      ['Privatumo politika', 'PrivacyPolicyScreen'],
      ['D.U.K.',             'FaqScreen'],
      ['Klientų aptarnavimas','CustomerSupportScreen'],
    ];
    for (const [label, screen] of cases) {
      fireEvent.press(getByText(label));
      expect(navigation.navigate).toHaveBeenCalledWith(screen);
    }
  });

  it('opens logout dialog and signs out when confirmed', () => {
    const { getByText, getByTestId } = render(<ProfileScreen navigation={navigation} />);
    fireEvent.press(getByText('Atsijungti'));
    // dialog becomes visible
    expect(getByTestId('logout-dialog').props.style.display).toBe('flex');

    fireEvent.press(getByTestId('btn-confirm-logout'));
    expect(mockSignOut).toHaveBeenCalled();
  });
});