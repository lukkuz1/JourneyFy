import React from 'react';
import { render } from '@testing-library/react-native';
import BottomTabBarScreen from '../../src/components/bottomTabBarScreen';
import { Text } from 'react-native';

// stub out each screen so the navigator can render
jest.mock('../src/screens/TemplateJourney/rides/ridesScreen', () => () => <Text>RidesScreen</Text>);
jest.mock('../src/screens/wallet/walletScreen', () => () => <Text>WalletScreen</Text>);
jest.mock('../src/screens/Main/homeScreen', () => () => <Text>HomeScreen</Text>);
jest.mock('../src/screens/TemplateProfile/profile/profileScreen', () => () => <Text>ProfileScreen</Text>);

describe('BottomTabBarScreen', () => {
  const navigation = {
    navigate: jest.fn(),
    addListener: jest.fn().mockReturnValue(() => {}),
    removeListener: jest.fn(),
    pop: jest.fn(),
  };

  it('renders four tabs with correct labels', () => {
    const { getByText } = render(<BottomTabBarScreen navigation={navigation} />);
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('My rides')).toBeTruthy();
    expect(getByText('Wallet')).toBeTruthy();
    expect(getByText('Profile')).toBeTruthy();
  });
});
