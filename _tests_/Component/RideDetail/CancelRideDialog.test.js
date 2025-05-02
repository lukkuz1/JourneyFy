import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CancelRideDialog from '../../../src/components/RideDetail/CancelRideDialog';

describe('CancelRideDialog', () => {
  it('renders prompt and both buttons, and calls callbacks', () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();

    const { getByText } = render(
      <CancelRideDialog isVisible={true} onClose={onClose} onConfirm={onConfirm} />
    );

    // Prompt
    expect(getByText('Ar tikrai norite atšaukti registraciją?')).toBeTruthy();

    // "Ne" button calls onClose
    fireEvent.press(getByText('Ne'));
    expect(onClose).toHaveBeenCalled();

    // "Taip" button calls onConfirm
    fireEvent.press(getByText('Taip'));
    expect(onConfirm).toHaveBeenCalled();
  });

  it('does not render when isVisible=false', () => {
    const { queryByText } = render(
      <CancelRideDialog isVisible={false} onClose={() => {}} onConfirm={() => {}} />
    );
    expect(queryByText('Ar tikrai norite atšaukti registraciją?')).toBeNull();
  });
});
