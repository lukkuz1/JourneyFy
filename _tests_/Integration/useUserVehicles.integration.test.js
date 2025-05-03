import React from 'react';
import { Text, Button } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';


jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  onSnapshot: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

import { getAuth } from 'firebase/auth';
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { useUserVehicles } from '../../src/hooks/useUserVehicles';

const TestComponent = () => {
  const {
    vehicles,
    showSnackBar,
    modalVisible,
    modalMessage,
    deleteVehicle,
    openStatusModal,
  } = useUserVehicles();
  return (
    <>
      <Text testID="vehicles">{JSON.stringify(vehicles)}</Text>
      <Text testID="snackbar">{String(showSnackBar)}</Text>
      <Text testID="modalVisible">{String(modalVisible)}</Text>
      <Text testID="modalMessage">{modalMessage}</Text>
      <Button title="Delete" onPress={() => deleteVehicle({ id: 'v1' })} />
      <Button title="OpenTrue" onPress={() => openStatusModal(true)} />
      <Button title="OpenFalse" onPress={() => openStatusModal(false)} />
    </>
  );
};

describe('useUserVehicles integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getAuth.mockReturnValue({ currentUser: { uid: 'user123' } });
    doc.mockReturnValue('docRef');
    const fakeDocs = [
      {
        id: 'v1',
        data: () => ({
          imageUrl: 'url1',
          vehicleName: 'Car1',
          seat: 4,
          approvedByAdmin: true,
        }),
      },
      {
        id: 'v2',
        data: () => ({
          imageUrl: 'url2',
          vehicleName: 'Car2',
          seat: 2,
          approvedByAdmin: false,
        }),
      },
    ];
    onSnapshot.mockImplementation((_, onNext) => {
      onNext({ docs: fakeDocs });
      return () => {};
    });
  });

  it('subscribes and populates vehicles', async () => {
    const { getByTestId } = render(<TestComponent />);
    await waitFor(() => {
      const vehicles = JSON.parse(getByTestId('vehicles').props.children);
      expect(vehicles).toEqual([
        {
          id: 'v1',
          image: 'url1',
          name: 'Car1',
          capacityOfPerson: 4,
          approvedByAdmin: true,
        },
        {
          id: 'v2',
          image: 'url2',
          name: 'Car2',
          capacityOfPerson: 2,
          approvedByAdmin: false,
        },
      ]);
    });
  });

  it('deleteVehicle sets showSnackBar and calls deleteDoc', async () => {
    deleteDoc.mockResolvedValue();
    const { getByTestId, getByText } = render(<TestComponent />);
    fireEvent.press(getByText('Delete'));
    await waitFor(() =>
      expect(deleteDoc).toHaveBeenCalledWith('docRef')
    );
    expect(getByTestId('snackbar').props.children).toBe('true');
  });

  it('openStatusModal toggles modal state and message', () => {
    const { getByTestId, getByText } = render(<TestComponent />);
    fireEvent.press(getByText('OpenTrue'));
    expect(getByTestId('modalVisible').props.children).toBe('true');
    expect(getByTestId('modalMessage').props.children).toBe(
      'Šis automobilis yra patvirtintas administratoriaus.'
    );
    fireEvent.press(getByText('OpenFalse'));
    expect(getByTestId('modalMessage').props.children).toBe(
      'Šis automobilis dar nėra patvirtintas administratoriaus.'
    );
  });
});