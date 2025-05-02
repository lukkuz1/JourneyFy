import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MapSettingsModal from '../../../src/components/Settings/MapSettingsModal';

// mock the EntryInputField to simplify rendering
jest.mock(
  '../src/components/Entry/EntryInputField',
  () => ({ headerText, placeholderText, onChangeText }) => (
    <TextInput
      testID={headerText}
      placeholder={placeholderText}
      onChangeText={onChangeText}
      value=""
    />
  )
);

import { TextInput } from 'react-native';

describe('MapSettingsModal', () => {
  const commonProps = {
    visible: true,
    radius: '',
    stops: '',
    populateRadius: '10',
    populateStops: '5',
    onChangeRadius: jest.fn(),
    onChangeStops: jest.fn(),
    onSave: jest.fn(),
    onCancel: jest.fn(),
  };

  it('renders title, input fields and buttons', () => {
    const { getByText, getByTestId } = render(
      <MapSettingsModal {...commonProps} />
    );

    expect(getByText('Žemėlapio nustatymai')).toBeTruthy();
    expect(getByTestId('Paskirties vietos spindulys')).toBeTruthy();
    expect(getByTestId('Maksimalus sustojimų skaičius')).toBeTruthy();

    expect(getByText('Išsaugoti')).toBeTruthy();
    expect(getByText('Atšaukti')).toBeTruthy();
  });

  it('invokes onSave and onCancel', () => {
    const { getByText } = render(<MapSettingsModal {...commonProps} />);

    fireEvent.press(getByText('Išsaugoti'));
    expect(commonProps.onSave).toHaveBeenCalled();

    fireEvent.press(getByText('Atšaukti'));
    expect(commonProps.onCancel).toHaveBeenCalled();
  });
});
