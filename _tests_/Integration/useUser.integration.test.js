import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

jest.mock('firebase/database', () => ({
  child: jest.fn(),
  ref: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
}));
jest.mock('../../src/services/firebase', () => ({
  rtdb: {},
}));

import { UserProvider, useUser } from '../../src/hooks/useUser';

const TestConsumer = () => {
  const { initialized, totalPoints, walletValue } = useUser();
  return (
    <>
      <Text testID="initialized">{String(initialized)}</Text>
      <Text testID="totalPoints">{String(totalPoints)}</Text>
      <Text testID="walletValue">{String(walletValue)}</Text>
    </>
  );
};

describe('UserProvider integration', () => {
  it('provides default context values', () => {
    const { getByTestId } = render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>
    );

    expect(getByTestId('initialized').props.children).toBe('false');
    expect(getByTestId('totalPoints').props.children).toBe('0');
    expect(getByTestId('walletValue').props.children).toBe('0');
  });
});