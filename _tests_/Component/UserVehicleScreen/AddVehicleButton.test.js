import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddVehicleButton from '../../../src/components/UserVehicleScreen/AddVehicleButton';

describe('AddVehicleButton', () => {
  it('renders a "+" icon and calls navigation.navigate on press', () => {
    const navigate = jest.fn();
    const navigation = { navigate };
    const { getByRole } = render(<AddVehicleButton navigation={navigation} />);
    // TouchableOpacity is considered a "button" role
    const button = getByRole('button');
    fireEvent.press(button);
    expect(navigate).toHaveBeenCalledWith('AddVehicleScreen');
  });
});
