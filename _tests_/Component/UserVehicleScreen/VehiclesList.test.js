import React from 'react';
import { render } from '@testing-library/react-native';
import VehiclesList from '../../../src/components/UserVehicleScreen/VehiclesList';

describe('VehiclesList', () => {
  const vehicles = [
    { id: '1', name: 'Car A', capacityOfPerson: 2, image: '', approvedByAdmin: false },
    { id: '2', name: 'Car B', capacityOfPerson: 3, image: '', approvedByAdmin: true },
  ];
  const deleteVehicle = jest.fn();
  const openStatusModal = jest.fn();

  it('renders one VehicleItem per vehicle', () => {
    const { getByText } = render(
      <VehiclesList
        vehicles={vehicles}
        deleteVehicle={deleteVehicle}
        openStatusModal={openStatusModal}
      />
    );
    expect(getByText('Car A')).toBeTruthy();
    expect(getByText('Car B')).toBeTruthy();
  });
});
