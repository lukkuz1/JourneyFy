import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OptionsList from '../../../src/components/Settings/OptionsList';

describe('OptionsList', () => {
  it('renders three options and calls the right handlers', () => {
    const onChangePassword = jest.fn();
    const onMapSettings = jest.fn();
    const onDeleteAccount = jest.fn();

    const { getByText } = render(
      <OptionsList
        onChangePassword={onChangePassword}
        onMapSettings={onMapSettings}
        onDeleteAccount={onDeleteAccount}
      />
    );

    const pwd = getByText('Pakeisti slaptažodį');
    const map = getByText('Žemėlapio nustatymai');
    const del = getByText('Paskyros ištrinimas');

    fireEvent.press(pwd);
    expect(onChangePassword).toHaveBeenCalled();

    fireEvent.press(map);
    expect(onMapSettings).toHaveBeenCalled();

    fireEvent.press(del);
    expect(onDeleteAccount).toHaveBeenCalled();
  });
});
