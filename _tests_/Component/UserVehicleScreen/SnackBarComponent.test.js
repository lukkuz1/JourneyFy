import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SnackBarComponent from '../../../src/components/UserVehicleScreen/SnackBarComponent';

describe('SnackBarComponent', () => {
  it('shows and hides the Snackbar', () => {
    const setShowSnackBar = jest.fn();
    const { getByText, queryByText, rerender } = render(
      <SnackBarComponent showSnackBar={false} setShowSnackBar={setShowSnackBar} />
    );
    expect(queryByText('Automobilis pašalintas')).toBeNull();

    rerender(
      <SnackBarComponent showSnackBar={true} setShowSnackBar={setShowSnackBar} />
    );
    const message = getByText('Automobilis pašalintas');
    expect(message).toBeTruthy();

    // simulate dismiss
    fireEvent(message.parent, 'onDismiss');
    expect(setShowSnackBar).toHaveBeenCalledWith(false);
  });
});
