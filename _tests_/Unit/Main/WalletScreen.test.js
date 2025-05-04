import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { render } from '@testing-library/react-native';


jest.mock('../../../src/components/myStatusBar', () => {
  const React = require('react');
  const { View } = require('react-native');
  return () => <View testID="statusbar" />;
});


jest.mock('../../../src/components/Wallet/WalletHeader', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return props => <Text testID="wallet-header">{props.title}</Text>;
});


jest.mock('../../../src/components/Wallet/WalletImage', () => {
  const React = require('react');
  const { View } = require('react-native');
  return () => <View testID="wallet-image" />;
});


jest.mock('../../../src/components/Wallet/BalanceInfo', () => {
  const React = require('react');
  const { View } = require('react-native');
  return () => <View testID="balance-info" />;
});


import WalletScreen from '../../../src/screens/Main/walletScreen';

describe('WalletScreen', () => {
  it('renders all the main child components', () => {
    const mockNav = { navigate: jest.fn() };
    const instance = render(
      <WalletScreen navigation={mockNav} />
    );


    expect(instance.getByTestId('statusbar')).toBeTruthy();


    const header = instance.getByTestId('wallet-header');
    expect(header.props.children).toBe('Piniginė');


    expect(instance.getByTestId('wallet-image')).toBeTruthy();


    expect(instance.getByTestId('balance-info')).toBeTruthy();


    const scrolls = instance.root.findAllByType(ScrollView);
    expect(scrolls).toHaveLength(1);
  });

  it('renders without crashing and accepts navigation prop', () => {
    const mockNav = { navigate: jest.fn() };
    render(<WalletScreen navigation={mockNav} />);
  });
});