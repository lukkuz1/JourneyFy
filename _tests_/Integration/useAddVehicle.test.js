import React from 'react';
import { Button, Text } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';


jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));
jest.mock('../../src/utils/uploadImage', () => ({
  uploadImageAsync: jest.fn(),
}));


import { useAddVehicle } from '../../src/hooks/useAddVehicle';
import { getAuth } from 'firebase/auth';
import { getDocs, addDoc } from 'firebase/firestore';
import { uploadImageAsync } from '../../src/utils/uploadImage';


const TestComponent = () => {
  const { uploading, addVehicle } = useAddVehicle();
  return (
    <>
      <Text testID="uploading">{String(uploading)}</Text>
      <Button
        title="Add"
        onPress={() =>
          addVehicle({
            vehicleName: 'My Car',
            vehicleType: 'Sedan',
            regNo: 'XYZ 123',
            color: 'Blue',
            seat: 5,
            facility: 'Garage',
            carImage: 'path/to/file.jpg',
          })
        }
      />
    </>
  );
};

describe('useAddVehicle integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getAuth.mockReturnValue({ currentUser: { uid: 'user123' } });
    getDocs.mockResolvedValue({ empty: true });
    uploadImageAsync.mockResolvedValue('https://img.example/vehicle.png');
    addDoc.mockResolvedValue({ id: 'new-doc-id' });
  });

  it('calls uploadImageAsync & addDoc, and resets uploading to false', async () => {
    const { getByTestId, getByText } = render(<TestComponent />);
    expect(getByTestId('uploading').props.children).toBe('false');
    fireEvent.press(getByText('Add'));
    await waitFor(() =>
      expect(getByTestId('uploading').props.children).toBe('false')
    );
    expect(uploadImageAsync).toHaveBeenCalledWith('path/to/file.jpg');
    const addDocCall = addDoc.mock.calls[0];
    const dataArg    = addDocCall[1];
    expect(dataArg).toEqual(
      expect.objectContaining({
        userId: 'user123',
        vehicleName: 'My Car',
        vehicleType: 'Sedan',
        regNo: 'XYZ 123',
        color: 'Blue',
        seat: 5,
        facility: 'Garage',
        imageUrl: 'https://img.example/vehicle.png',
        approvedByAdmin: false,
      })
    );
  });
});