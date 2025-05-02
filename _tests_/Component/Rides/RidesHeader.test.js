import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RidesHeader from '../../../src/components/Rides/RidesHeader';

describe('RidesHeader', () => {
  it('renders title and badge, and navigates on icon press', () => {
    const navigation = { push: jest.fn() };
    const { getByText, getByTestId } = render(
      <RidesHeader navigation={navigation} />
    );

    expect(getByText('Mano kelionės')).toBeTruthy();
    // the icon is a MaterialIcons, test by press on the container
    const icon = getByText((_, node) => node.type === 'Icon');
    fireEvent.press(icon);
    expect(navigation.push).toHaveBeenCalledWith('RideRequestScreen');
  });
});
