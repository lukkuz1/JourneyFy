// _tests_/Unit/Journey/AddVehicleScreen.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ActivityIndicator } from 'react-native';

// 1) Stub child components
jest.mock('../../../src/components/myStatusBar', () => () => null);

jest.mock('../../../src/components/header', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return props => <Text testID="header">{props.title}</Text>;
});

jest.mock('../../../src/components/AddVehicle/VehicleForm', () => {
  const React = require('react');
  const { View, Button } = require('react-native');
  return props => (
    <View testID="form">
      <Button testID="open-image" onPress={props.onOpenImagePicker} title="img" />
      <Button testID="open-seat" onPress={props.onOpenSeatPicker} title="seat" />
      <Button testID="open-type" onPress={props.onOpenVehicleTypePicker} title="type" />
    </View>
  );
});

jest.mock('../../../src/components/AddVehicle/ImagePickerBottomSheet', () => {
  const React = require('react');
  const { View, Text, Button } = require('react-native');
  return props => (
    <View testID="image-picker-sheet">
      <Text testID="image-picker-visible">{String(props.isVisible)}</Text>
      <Button testID="close-image" onPress={props.onClose} title="close" />
      <Button testID="pick-image" onPress={() => props.onPickImage('file.jpg')} title="pick" />
    </View>
  );
});

jest.mock('../../../src/components/Home/NoOfSeatSheet', () => {
  const React = require('react');
  const { View, Text, Button } = require('react-native');
  return props => (
    <View testID="seat-sheet">
      <Text testID="seat-visible">{String(props.isVisible)}</Text>
      <Button testID="close-seat" onPress={props.onClose} title="close" />
      <Button testID="select-seat" onPress={() => props.onSelectSeat(7)} title="select" />
    </View>
  );
});

jest.mock('../../../src/components/AddVehicle/VehicleTypeSheet', () => {
  const React = require('react');
  const { View, Text, Button } = require('react-native');
  return props => (
    <View testID="type-sheet">
      <Text testID="type-visible">{String(props.isVisible)}</Text>
      <Button testID="close-type" onPress={props.onClose} title="close" />
      <Button testID="select-type" onPress={() => props.onSelectVehicleType('SUV')} title="select" />
    </View>
  );
});

// 2) Stub the hook
let mockUploading = false;
const mockAddVehicle = jest.fn();
jest.mock('../../../src/hooks/useAddVehicle', () => ({
  useAddVehicle: () => ({
    uploading: mockUploading,
    addVehicle: mockAddVehicle,
  }),
}));

// 3) Import the screen under test
import AddVehicleScreen from '../../../src/screens/TemplateJourney/addVehicle/addVehicleScreen';

describe('AddVehicleScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUploading = false;
  });

  it('renders header and form buttons', () => {
    const navigation = { pop: jest.fn() };
    const { getByTestId } = render(<AddVehicleScreen navigation={navigation} />);

    expect(getByTestId('header').props.children).toBe('Pridėti mašiną');
    expect(getByTestId('form')).toBeTruthy();
    ['open-image', 'open-seat', 'open-type'].forEach(id =>
      expect(getByTestId(id)).toBeTruthy()
    );
  });

  it('opens and closes image picker sheet', () => {
    const navigation = { pop: jest.fn() };
    const { getByTestId } = render(<AddVehicleScreen navigation={navigation} />);

    expect(getByTestId('image-picker-visible').props.children).toBe('false');
    fireEvent.press(getByTestId('open-image'));
    expect(getByTestId('image-picker-visible').props.children).toBe('true');
    fireEvent.press(getByTestId('close-image'));
    expect(getByTestId('image-picker-visible').props.children).toBe('false');

    fireEvent.press(getByTestId('open-image'));
    fireEvent.press(getByTestId('pick-image'));
    expect(getByTestId('image-picker-visible').props.children).toBe('false');
  });

  it('opens and closes seat picker sheet', () => {
    const navigation = { pop: jest.fn() };
    const { getByTestId } = render(<AddVehicleScreen navigation={navigation} />);

    expect(getByTestId('seat-visible').props.children).toBe('false');
    fireEvent.press(getByTestId('open-seat'));
    expect(getByTestId('seat-visible').props.children).toBe('true');
    fireEvent.press(getByTestId('close-seat'));
    expect(getByTestId('seat-visible').props.children).toBe('false');

    fireEvent.press(getByTestId('open-seat'));
    fireEvent.press(getByTestId('select-seat'));
    // state update internal
  });

  it('opens and closes type picker sheet', () => {
    const navigation = { pop: jest.fn() };
    const { getByTestId } = render(<AddVehicleScreen navigation={navigation} />);

    expect(getByTestId('type-visible').props.children).toBe('false');
    fireEvent.press(getByTestId('open-type'));
    expect(getByTestId('type-visible').props.children).toBe('true');
    fireEvent.press(getByTestId('close-type'));
    expect(getByTestId('type-visible').props.children).toBe('false');
  });

  it('submits and navigates back on successful add', async () => {
    mockAddVehicle.mockResolvedValue();
    const navigation = { pop: jest.fn() };
    const { getByText } = render(<AddVehicleScreen navigation={navigation} />);
    fireEvent.press(getByText('Pridėti'));
    await waitFor(() => expect(mockAddVehicle).toHaveBeenCalled());
    expect(navigation.pop).toHaveBeenCalled();
  });
});