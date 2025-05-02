import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DeleteAccountModal from '../../../src/components/Settings/DeleteAccountModal';

describe('DeleteAccountModal', () => {
  it('renders title, message and buttons when visible', () => {
    const onDelete = jest.fn();
    const onCancel = jest.fn();

    const { getByText } = render(
      <DeleteAccountModal visible={true} onDelete={onDelete} onCancel={onCancel} />
    );

    expect(getByText('Paskyros ištrinimas')).toBeTruthy();
    expect(getByText('Ar tikrai norite ištrinti savo paskyrą?')).toBeTruthy();
    expect(getByText('Ištrinti')).toBeTruthy();
    expect(getByText('Atšaukti')).toBeTruthy();
  });

  it('calls callbacks when buttons pressed', () => {
    const onDelete = jest.fn();
    const onCancel = jest.fn();

    const { getByText } = render(
      <DeleteAccountModal visible={true} onDelete={onDelete} onCancel={onCancel} />
    );

    fireEvent.press(getByText('Ištrinti'));
    expect(onDelete).toHaveBeenCalled();

    fireEvent.press(getByText('Atšaukti'));
    expect(onCancel).toHaveBeenCalled();
  });
});
