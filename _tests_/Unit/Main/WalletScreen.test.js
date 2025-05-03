// _tests_/Unit/Main/WalletScreen.test.js
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { render } from '@testing-library/react-native';

// 1) Stub MyStatusBar
jest.mock('../../../src/components/myStatusBar', () => {
  const React = require('react');
  const { View } = require('react-native');
  return () => <View testID="statusbar" />;
});

// 2) Stub WalletHeader to render its title prop
jest.mock('../../../src/components/Wallet/WalletHeader', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return props => <Text testID="wallet-header">{props.title}</Text>;
});

// 3) Stub WalletImage
jest.mock('../../../src/components/Wallet/WalletImage', () => {
  const React = require('react');
  const { View } = require('react-native');
  return () => <View testID="wallet-image" />;
});

// 4) Stub BalanceInfo (accepts navigation but we just render a placeholder)
jest.mock('../../../src/components/Wallet/BalanceInfo', () => {
  const React = require('react');
  const { View } = require('react-native');
  return () => <View testID="balance-info" />;
});

// 5) Now import the screen under test
import WalletScreen from '../../../src/screens/Main/walletScreen';

describe('WalletScreen', () => {
  it('renders all the main child components', () => {
    const mockNav = { navigate: jest.fn() };
    const instance = render(
      <WalletScreen navigation={mockNav} />
    );

    // status bar stub
    expect(instance.getByTestId('statusbar')).toBeTruthy();

    // header stub with correct title
    const header = instance.getByTestId('wallet-header');
    expect(header.props.children).toBe('Piniginė');

    // image stub
    expect(instance.getByTestId('wallet-image')).toBeTruthy();

    // balance info stub
    expect(instance.getByTestId('balance-info')).toBeTruthy();

    // ensure exactly one ScrollView
    const scrolls = instance.root.findAllByType(ScrollView);
    expect(scrolls).toHaveLength(1);
  });

  it('renders without crashing and accepts navigation prop', () => {
    const mockNav = { navigate: jest.fn() };
    render(<WalletScreen navigation={mockNav} />);
    // If it renders, navigation passed down correctly (no crash)
  });
});