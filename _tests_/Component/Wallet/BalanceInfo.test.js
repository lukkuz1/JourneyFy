import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BalanceInfo from '../../../src/components/Wallet/BalanceInfo';
import useWalletValue from '../../../src/hooks/useWalletValue';

jest.mock('../src/hooks/useWalletValue');

describe('BalanceInfo', () => {
  const navigate = jest.fn();
  const navigation = { navigate };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays wallet value from hook and navigates correctly', () => {
    useWalletValue.mockReturnValue(123.45);
    const { getByText, getAllByRole } = render(
      <BalanceInfo navigation={navigation} />
    );

    // balance
    expect(getByText('$123.45')).toBeTruthy();
    expect(getByText('Galimas likutis')).toBeTruthy();

    // two WalletOption buttons
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(2);

    // first: add money
    fireEvent.press(buttons[0]);
    expect(navigate).toHaveBeenCalledWith(
      'AddAndSendMoneyScreen',
      { addFor: 'money' }
    );

    // second: send money
    fireEvent.press(buttons[1]);
    expect(navigate).toHaveBeenCalledWith(
      'AddAndSendMoneyScreen',
      { addFor: 'bank' }
    );
  });
});
