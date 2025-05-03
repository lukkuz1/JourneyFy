import { useDeleteAccount } from '../../src/hooks/useDeleteAccount';
import { getAuth, deleteUser } from 'firebase/auth';
import { Alert } from 'react-native';
import { waitFor } from '@testing-library/react-native';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  deleteUser: jest.fn(),
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('useDeleteAccount', () => {
  let fakeSignOut;
  const fakeUser = { uid: 'u1' };

  beforeEach(() => {
    jest.clearAllMocks();
    fakeSignOut = jest.fn();
    getAuth.mockReturnValue({ currentUser: fakeUser, signOut: fakeSignOut });
  });

  it('deletes the user, signs out, and shows success alert', async () => {
    deleteUser.mockResolvedValue();

    const { handleDeleteAccount } = useDeleteAccount();
    handleDeleteAccount();

    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalledWith(fakeUser);
      expect(fakeSignOut).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith(
        'Paskyra ištrinta',
        'Jūsų paskyra ištrinta.'
      );
    });
  });

  it('shows error alert if deleteUser rejects', async () => {
    deleteUser.mockRejectedValue(new Error('fail'));

    const { handleDeleteAccount } = useDeleteAccount();
    handleDeleteAccount();

    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalledWith(fakeUser);
      expect(fakeSignOut).not.toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith(
        'Klaida',
        'Nepavyko ištrinti paskyros.'
      );
    });
  });
});