
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ActivityIndicator } from 'react-native';


jest.mock('firebase/auth', () => ({
  getAuth: () => ({ currentUser: { uid: 'u1' } }),
}));


const mockHandleUpdateMapData = jest.fn();
const mockSetRadius = jest.fn();
const mockSetStops = jest.fn();
jest.mock('../../../src/hooks/useMapSettings', () => ({
  useMapSettings: () => ({
    loading: false,
    radius: '10',
    stops: '5',
    populateRadius: '15',
    populateStops: '7',
    setRadius: mockSetRadius,
    setStops: mockSetStops,
    handleUpdateMapData: mockHandleUpdateMapData,
  }),
}));

const mockHandlePasswordChange = jest.fn();
const mockSetNewPassword = jest.fn();
const mockSetConfirmPassword = jest.fn();
jest.mock('../../../src/hooks/usePasswordChange', () => ({
  usePasswordChange: () => ({
    newPassword: 'abc',
    confirmPassword: 'abc',
    setNewPassword: mockSetNewPassword,
    setConfirmPassword: mockSetConfirmPassword,
    handlePasswordChange: mockHandlePasswordChange,
  }),
}));

const mockHandleDeleteAccount = jest.fn();
jest.mock('../../../src/hooks/useDeleteAccount', () => ({
  useDeleteAccount: () => ({
    handleDeleteAccount: mockHandleDeleteAccount,
  }),
}));


jest.mock('../../../src/components/myStatusBar', () => () => null);
jest.mock('../../../src/components/header', () => () => null);
jest.mock('../../../src/components/Settings/ProfileSection', () => () => null);
jest.mock('../../../src/components/Settings/OptionsList', () => ({
  __esModule: true,
  default: props => {
    const React = require('react');
    const { Button, View } = require('react-native');
    return React.createElement(View, null, [
      React.createElement(Button, {
        key: 'pw',
        testID: 'btn-change-password',
        title: 'Change Password',
        onPress: props.onChangePassword,
      }),
      React.createElement(Button, {
        key: 'map',
        testID: 'btn-map-settings',
        title: 'Map Settings',
        onPress: props.onMapSettings,
      }),
      React.createElement(Button, {
        key: 'del',
        testID: 'btn-delete-account',
        title: 'Delete Account',
        onPress: props.onDeleteAccount,
      }),
    ]);
  },
}));
jest.mock('../../../src/components/Settings/MapSettingsModal', () => ({
  __esModule: true,
  default: props => {
    const React = require('react');
    const { Button, View, Text } = require('react-native');
    return React.createElement(View, { testID: 'map-modal' }, [
      React.createElement(Text, {
        key: 'vis',
        testID: 'map-visible',
      }, String(props.visible)),
      React.createElement(Button, {
        key: 'save',
        testID: 'btn-save-map',
        title: 'Save',
        onPress: props.onSave,
      }),
      React.createElement(Button, {
        key: 'cancel',
        testID: 'btn-cancel-map',
        title: 'Cancel',
        onPress: props.onCancel,
      }),
    ]);
  },
}));
jest.mock('../../../src/components/Settings/PasswordModal', () => ({
  __esModule: true,
  default: props => {
    const React = require('react');
    const { Button, View, Text } = require('react-native');
    return React.createElement(View, { testID: 'password-modal' }, [
      React.createElement(Text, {
        key: 'vis',
        testID: 'password-visible',
      }, String(props.visible)),
      React.createElement(Button, {
        key: 'submit',
        testID: 'btn-submit-password',
        title: 'Submit',
        onPress: props.onSubmit,
      }),
      React.createElement(Button, {
        key: 'cancel',
        testID: 'btn-cancel-password',
        title: 'Cancel',
        onPress: props.onCancel,
      }),
    ]);
  },
}));
jest.mock('../../../src/components/Settings/DeleteAccountModal', () => ({
  __esModule: true,
  default: props => {
    const React = require('react');
    const { Button, View, Text } = require('react-native');
    return React.createElement(View, { testID: 'delete-modal' }, [
      React.createElement(Text, {
        key: 'vis',
        testID: 'delete-visible',
      }, String(props.visible)),
      React.createElement(Button, {
        key: 'del',
        testID: 'btn-confirm-delete',
        title: 'Delete',
        onPress: props.onDelete,
      }),
      React.createElement(Button, {
        key: 'cancel',
        testID: 'btn-cancel-delete',
        title: 'Cancel',
        onPress: props.onCancel,
      }),
    ]);
  },
}));


import Settings from '../../../src/screens/Main/Settings';

describe('<Settings />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('opens and saves map settings', async () => {
    const { getByTestId } = render(<Settings navigation={{ navigate: () => {} }} />);
    expect(getByTestId('map-visible').props.children).toBe('false');
    fireEvent.press(getByTestId('btn-map-settings'));
    expect(getByTestId('map-visible').props.children).toBe('true');

    mockHandleUpdateMapData.mockResolvedValueOnce(true);
    fireEvent.press(getByTestId('btn-save-map'));
    await waitFor(() => {
      expect(getByTestId('map-visible').props.children).toBe('false');
    });
  });

  it('opens and cancels map settings', () => {
    const { getByTestId } = render(<Settings navigation={{ navigate: () => {} }} />);
    fireEvent.press(getByTestId('btn-map-settings'));
    expect(getByTestId('map-visible').props.children).toBe('true');
    fireEvent.press(getByTestId('btn-cancel-map'));
    expect(getByTestId('map-visible').props.children).toBe('false');
  });

  it('opens and submits password change', async () => {
    mockHandlePasswordChange.mockReturnValue(true);
    const { getByTestId } = render(<Settings navigation={{ navigate: () => {} }} />);
    fireEvent.press(getByTestId('btn-change-password'));
    expect(getByTestId('password-visible').props.children).toBe('true');
    fireEvent.press(getByTestId('btn-submit-password'));
    await waitFor(() => {
      expect(getByTestId('password-visible').props.children).toBe('false');
      expect(mockHandlePasswordChange).toHaveBeenCalled();
    });
  });

  it('opens and cancels password modal', () => {
    const { getByTestId } = render(<Settings navigation={{ navigate: () => {} }} />);
    fireEvent.press(getByTestId('btn-change-password'));
    fireEvent.press(getByTestId('btn-cancel-password'));
    expect(getByTestId('password-visible').props.children).toBe('false');
  });

  it('opens and confirms delete account', () => {
    const { getByTestId } = render(<Settings navigation={{ navigate: () => {} }} />);
    fireEvent.press(getByTestId('btn-delete-account'));
    expect(getByTestId('delete-visible').props.children).toBe('true');
    fireEvent.press(getByTestId('btn-confirm-delete'));
    expect(mockHandleDeleteAccount).toHaveBeenCalled();
  });

  it('cancels delete account modal', () => {
    const { getByTestId } = render(<Settings navigation={{ navigate: () => {} }} />);
    fireEvent.press(getByTestId('btn-delete-account'));
    fireEvent.press(getByTestId('btn-cancel-delete'));
    expect(getByTestId('delete-visible').props.children).toBe('false');
  });
});