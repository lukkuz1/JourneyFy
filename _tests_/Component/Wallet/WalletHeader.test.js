import React from 'react';
import { render } from '@testing-library/react-native';
import WalletHeader from '../../../src/components/Wallet/WalletHeader';

describe('WalletHeader', () => {
  it('renders the given title centered', () => {
    const { getByText } = render(<WalletHeader title="My Wallet" />);
    const title = getByText('My Wallet');
    expect(title).toBeTruthy();
  });
});
