
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';


const mockDeleteVehicle = jest.fn();
const mockSetShowSnackBar = jest.fn();
const mockSetModalVisible = jest.fn();
const mockOpenStatusModal = jest.fn();

jest.mock('../../../src/hooks/useUserVehicles', () => ({
  useUserVehicles: () => ({
    vehicles: [
      { id: 'v1', vehicleName: 'Car A' },
      { id: 'v2', vehicleName: 'Car B' },
    ],
    deleteVehicle: mockDeleteVehicle,
    showSnackBar: true,
    setShowSnackBar: mockSetShowSnackBar,
    modalVisible: false,
    setModalVisible: mockSetModalVisible,
    modalMessage: 'Deleted!',
    openStatusModal: mockOpenStatusModal,
  }),
}));


jest.mock('../../../src/components/myStatusBar', () => () => null);

jest.mock('../../../src/components/header', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return props => React.createElement(Text, { testID: 'header' }, props.title);
});

jest.mock(
  '../../../src/components/UserVehicleScreen/VehiclesList',
  () => {
    const React = require('react');
    const { View, Text, Button } = require('react-native');
    return props =>
      React.createElement(
        View,
        { testID: 'vehicles-list' },
        props.vehicles.map(v =>
          React.createElement(Text, { key: v.id, testID: `vehicle-${v.id}` }, v.vehicleName)
        ).concat([
          React.createElement(Button, {
            key: 'del1',
            testID: 'delete-first',
            title: 'Delete First',
            onPress: () => props.deleteVehicle(props.vehicles[0].id),
          }),
          React.createElement(Button, {
            key: 'stat1',
            testID: 'status-first',
            title: 'Status First',
            onPress: () => props.openStatusModal('Status for ' + props.vehicles[0].id),
          }),
        ])
      );
  }
);

jest.mock(
  '../../../src/components/UserVehicleScreen/AddVehicleButton',
  () => {
    const React = require('react');
    const { Button } = require('react-native');
    return props =>
      React.createElement(Button, {
        testID: 'add-button',
        title: 'Add',
        onPress: () => props.navigation.navigate('AddVehicle'),
      });
  }
);

jest.mock(
  '../../../src/components/UserVehicleScreen/StatusModal',
  () => {
    const React = require('react');
    const { View, Text, Button } = require('react-native');
    return props =>
      React.createElement(
        View,
        { testID: 'status-modal' },
        React.createElement(Text, { testID: 'modal-visible' }, String(props.modalVisible)),
        React.createElement(Text, { testID: 'modal-message' }, props.modalMessage),
        React.createElement(Button, {
          testID: 'modal-close',
          title: 'Close',
          onPress: () => props.setModalVisible(false),
        })
      );
  }
);

jest.mock(
  '../../../src/components/UserVehicleScreen/SnackBarComponent',
  () => {
    const React = require('react');
    const { View, Text, Button } = require('react-native');
    return props =>
      React.createElement(
        View,
        { testID: 'snackbar' },
        React.createElement(Text, { testID: 'snackbar-visible' }, String(props.showSnackBar)),
        React.createElement(Button, {
          testID: 'snackbar-close',
          title: 'Hide',
          onPress: () => props.setShowSnackBar(false),
        })
      );
  }
);

import UserVehiclesScreen from '../../../src/screens/TemplateProfile/userVehicles/userVehiclesScreen';

describe('<UserVehiclesScreen />', () => {
  let navigation;
  beforeEach(() => {
    jest.clearAllMocks();
    navigation = { navigate: jest.fn() };
  });

  it('renders header, list items, add-button, modal & snackbar', () => {
    const { getByTestId } = render(<UserVehiclesScreen navigation={navigation} />);
    expect(getByTestId('header').props.children).toBe('Mano automobilis');
    expect(getByTestId('vehicle-v1').props.children).toBe('Car A');
    expect(getByTestId('vehicle-v2').props.children).toBe('Car B');
    expect(getByTestId('add-button')).toBeTruthy();
    expect(getByTestId('modal-visible').props.children).toBe('false');
    expect(getByTestId('modal-message').props.children).toBe('Deleted!');
    expect(getByTestId('snackbar-visible').props.children).toBe('true');
  });

  it('calls deleteVehicle when delete button pressed', () => {
    const { getByTestId } = render(<UserVehiclesScreen navigation={navigation} />);
    fireEvent.press(getByTestId('delete-first'));
    expect(mockDeleteVehicle).toHaveBeenCalledWith('v1');
  });

  it('opens status modal via openStatusModal', () => {
    const { getByTestId } = render(<UserVehiclesScreen navigation={navigation} />);
    fireEvent.press(getByTestId('status-first'));
    expect(mockOpenStatusModal).toHaveBeenCalledWith('Status for v1');
  });

  it('navigates to AddVehicle when add button pressed', () => {
    const { getByTestId } = render(<UserVehiclesScreen navigation={navigation} />);
    fireEvent.press(getByTestId('add-button'));
    expect(navigation.navigate).toHaveBeenCalledWith('AddVehicle');
  });

  it('closes modal when close pressed', () => {
    const { getByTestId } = render(<UserVehiclesScreen navigation={navigation} />);
    fireEvent.press(getByTestId('modal-close'));
    expect(mockSetModalVisible).toHaveBeenCalledWith(false);
  });

  it('hides snackbar when close pressed', () => {
    const { getByTestId } = render(<UserVehiclesScreen navigation={navigation} />);
    fireEvent.press(getByTestId('snackbar-close'));
    expect(mockSetShowSnackBar).toHaveBeenCalledWith(false);
  });
});