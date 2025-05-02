import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RidesHeader from '../../../src/components/RideHistory/RidesHeader';

describe('RidesHeader', () => {
  it('renders title and back button triggers goBack', () => {
    const mockNav = { goBack: jest.fn() };
    const { getByText, getByTestId } = render(<RidesHeader navigation={mockNav} />);

    // Title
    expect(getByText('Kelionių istorija')).toBeTruthy();

    // Press back
    fireEvent.press(getByTestId('rides-header-back'));
    expect(mockNav.goBack).toHaveBeenCalled();
  });
});
