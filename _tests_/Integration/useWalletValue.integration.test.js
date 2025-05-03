
import React from 'react';
import { Text } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));
jest.mock('firebase/database', () => ({
  ref: jest.fn(),
  onValue: jest.fn(),
}));
jest.mock('../../src/services/firebase', () => ({
  rtdb: {},
}));

import { getAuth } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import useWalletValue from '../../src/hooks/useWalletValue';

const TestComponent = () => {
  const walletValue = useWalletValue();
  return <Text testID="value">{String(walletValue)}</Text>;
};

describe('useWalletValue integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 0 when no user is signed in', () => {
    getAuth.mockReturnValue({ currentUser: null });
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('value').props.children).toBe('0');
    expect(onValue).not.toHaveBeenCalled();
  });

  it('subscribes and updates walletValue when user is signed in', async () => {
    const fakeUid = 'user123';
    getAuth.mockReturnValue({ currentUser: { uid: fakeUid } });
    ref.mockImplementation((db, path) => `ref:${path}`);
    const fakeSnapshot = {
      exists: () => true,
      val: () => 99,
    };
    onValue.mockImplementation((refArg, onNext) => {
      onNext(fakeSnapshot);
      return () => {};
    });

    const { getByTestId } = render(<TestComponent />);

    await waitFor(() => {
      expect(onValue).toHaveBeenCalledWith(
        `ref:users/${fakeUid}/walletValue`,
        expect.any(Function),
        expect.any(Function)
      );
      expect(getByTestId('value').props.children).toBe('99');
    });
  });
});