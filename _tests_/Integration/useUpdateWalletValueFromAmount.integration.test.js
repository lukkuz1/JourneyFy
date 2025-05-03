import React from 'react';
import { Text } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';


jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));
jest.mock('firebase/database', () => ({
  ref: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
}));
jest.mock('../../src/services/firebase', () => ({
  rtdb: {},
}));

import { getAuth } from 'firebase/auth';
import { ref, get, update } from 'firebase/database';
import useUpdateWalletValueFromAmount from '../../src/hooks/useUpdateWalletValueFromAmount';

const TestComponent = ({ amount, operation }) => {
  const walletValue = useUpdateWalletValueFromAmount(amount, operation);
  return (
    <Text testID="value">
      {walletValue === null ? 'null' : String(walletValue)}
    </Text>
  );
};

describe('useUpdateWalletValueFromAmount integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    ref.mockImplementation((db, path) => `ref:${path}`);
  });

  it('returns null when there is no signed-in user', () => {
    getAuth.mockReturnValue({ currentUser: null });

    const { getByTestId } = render(<TestComponent amount="10" />);
    expect(getByTestId('value').props.children).toBe('null');
    expect(get).not.toHaveBeenCalled();
    expect(update).not.toHaveBeenCalled();
  });

  it('adds amount to zero when walletValue does not exist', async () => {
    const fakeUid = 'user1';
    getAuth.mockReturnValue({ currentUser: { uid: fakeUid } });
    get.mockResolvedValue({ exists: () => false });
    update.mockResolvedValue();

    const { getByTestId } = render(
      <TestComponent amount="5" operation="add" />
    );

    await waitFor(() =>
      expect(getByTestId('value').props.children).toBe('5')
    );

    expect(ref).toHaveBeenCalledWith({}, `users/${fakeUid}/walletValue`);
    expect(update).toHaveBeenCalledWith(
      `ref:users/${fakeUid}`,
      { walletValue: 5 }
    );
  });

  it('subtracts amount from existing walletValue when operation is "subtract"', async () => {
    const fakeUid = 'user2';
    getAuth.mockReturnValue({ currentUser: { uid: fakeUid } });
    get.mockResolvedValue({
      exists: () => true,
      val: () => 20,
    });
    update.mockResolvedValue();

    const { getByTestId } = render(
      <TestComponent amount="7" operation="subtract" />
    );

    await waitFor(() =>
      expect(getByTestId('value').props.children).toBe('13')
    );

    expect(update).toHaveBeenCalledWith(
      `ref:users/${fakeUid}`,
      { walletValue: 13 }
    );
  });
});