import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WalletOption from '../../../src/components/Wallet/WalletOption';
import { MaterialCommunityIcons, Ionicons } from 'react-native-vector-icons';
import { Colors } from '../src/constants/styles';

describe('WalletOption', () => {
  const onPress = jest.fn();

  it('renders MaterialCommunityIcons by default', () => {
    const { getByText, getByTestId } = render(
      <WalletOption
        iconName="wallet-plus-outline"
        iconColor={Colors.secondaryColor}
        optionTitle="Add Funds"
        optionSubtitle="Tap to add"
        onPress={onPress}
      />
    );
    expect(getByText('Add Funds')).toBeTruthy();
    expect(getByText('Tap to add')).toBeTruthy();
  });

  it('renders Ionicons when iconType="Ionicons"', () => {
    const { getByText } = render(
      <WalletOption
        iconName="ios-add"
        iconType="Ionicons"
        iconColor={Colors.secondaryColor}
        optionTitle="Test"
        optionSubtitle="Subtitle"
        onPress={onPress}
      />
    );
    expect(getByText('Test')).toBeTruthy();
    expect(getByText('Subtitle')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const { getByRole } = render(
      <WalletOption
        iconName="test-icon"
        iconType="MaterialCommunityIcons"
        iconColor={Colors.secondaryColor}
        optionTitle="Tap me"
        optionSubtitle="Subtitle"
        onPress={onPress}
      />
    );
    const btn = getByRole('button');
    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalled();
  });
});
