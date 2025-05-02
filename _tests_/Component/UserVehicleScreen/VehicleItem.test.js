import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import VehicleItem from '../../../src/components/UserVehicleScreen/VehicleItem';
import { Colors } from '../src/constants/styles';

describe('VehicleItem', () => {
  const vehicle = {
    id: 'v1',
    name: 'MyCar',
    capacityOfPerson: 4,
    image: '',
    approvedByAdmin: true,
  };

  it('renders default image, name and capacity', () => {
    const { getByText, getAllByRole } = render(
      <VehicleItem
        vehicle={vehicle}
        deleteVehicle={jest.fn()}
        openStatusModal={jest.fn()}
      />
    );
    expect(getByText('MyCar')).toBeTruthy();
    expect(getByText('4 vietų')).toBeTruthy();
    // two buttons: approvedToggle + delete
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('calls openStatusModal with approved flag when the status icon pressed', () => {
    const openStatusModal = jest.fn();
    const { getAllByRole } = render(
      <VehicleItem
        vehicle={vehicle}
        deleteVehicle={jest.fn()}
        openStatusModal={openStatusModal}
      />
    );
    // first button is the status toggle
    fireEvent.press(getAllByRole('button')[0]);
    expect(openStatusModal).toHaveBeenCalledWith(true);
  });

  it('calls deleteVehicle with vehicle id when trash pressed', () => {
    const deleteVehicle = jest.fn();
    const { getAllByRole } = render(
      <VehicleItem
        vehicle={vehicle}
        deleteVehicle={deleteVehicle}
        openStatusModal={jest.fn()}
      />
    );
    // second button is the delete
    fireEvent.press(getAllByRole('button')[1]);
    expect(deleteVehicle).toHaveBeenCalledWith({ id: vehicle.id });
  });
});
