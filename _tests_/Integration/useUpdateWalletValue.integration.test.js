import useUpdateWalletValue from '../../src/hooks/useUpdateWalletValue';
import { getAuth } from 'firebase/auth';
import { ref, get, update } from 'firebase/database';

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

describe('useUpdateWalletValue', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('throws if no user is signed in', async () => {
    getAuth.mockReturnValue({ currentUser: null });
    const { addMoneyToWallet } = useUpdateWalletValue();

    await expect(addMoneyToWallet(50)).rejects.toThrow(
      'Naudotojas nėra prisijungęs'
    );

    expect(get).not.toHaveBeenCalled();
    expect(update).not.toHaveBeenCalled();
  });

  it('adds amount to zero when no existing walletValue', async () => {
    const fakeUid = 'user123';
    getAuth.mockReturnValue({ currentUser: { uid: fakeUid } });

    get.mockResolvedValue({ exists: () => false });
    update.mockResolvedValue();

    const { addMoneyToWallet } = useUpdateWalletValue();
    const result = await addMoneyToWallet(20);

    expect(ref).toHaveBeenCalledWith({}, `users/${fakeUid}/walletValue`);

    expect(update).toHaveBeenCalledTimes(1);

    const updateArgs = update.mock.calls[0];
    expect(updateArgs[1]).toEqual({ walletValue: 20 });

    expect(result).toBe(20);
  });

  it('adds amount to existing walletValue', async () => {
    const fakeUid = 'user456';
    getAuth.mockReturnValue({ currentUser: { uid: fakeUid } });

    get.mockResolvedValue({
      exists: () => true,
      val: () => 30,
    });
    update.mockResolvedValue();

    const { addMoneyToWallet } = useUpdateWalletValue();
    const result = await addMoneyToWallet(15);

    expect(update).toHaveBeenCalledTimes(1);

    const updateArgs = update.mock.calls[0];
    expect(updateArgs[1]).toEqual({ walletValue: 45 });

    expect(result).toBe(45);
  });
});