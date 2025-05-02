import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PasswordModal from '../../../src/components/Settings/PasswordModal';

// mock EntryInputField again
jest.mock(
  '../src/components/Entry/EntryInputField',
  () => ({ headerText, onChangeText }) => (
    <TextInput
      testID={headerText}
      onChangeText={onChangeText}
      value=""
    />
  )
);

import { TextInput } from 'react-native';

describe('PasswordModal', () => {
  const props = {
    visible: true,
    newPassword: '',
    confirmPassword: '',
    onChangeNewPassword: jest.fn(),
    onChangeConfirmPassword: jest.fn(),
    onSubmit: jest.fn(),
    onCancel: jest.fn(),
  };

  it('renders title, two password inputs and buttons', () => {
    const { getByText, getByTestId } = render(<PasswordModal {...props} />);

    expect(getByText('Pakeisti slaptažodį')).toBeTruthy();
    expect(getByTestId('Naujas slaptažodis')).toBeTruthy();
    expect(getByTestId('Patvirtinkite naują slaptažodį')).toBeTruthy();
    expect(getByText('Patvirtinti')).toBeTruthy();
    expect(getByText('Atšaukti')).toBeTruthy();
  });

  it('invokes onSubmit and onCancel', () => {
    const { getByText } = render(<PasswordModal {...props} />);

    fireEvent.press(getByText('Patvirtinti'));
    expect(props.onSubmit).toHaveBeenCalled();

    fireEvent.press(getByText('Atšaukti'));
    expect(props.onCancel).toHaveBeenCalled();
  });
});
