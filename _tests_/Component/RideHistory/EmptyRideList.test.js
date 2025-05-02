import React from 'react';
import { render } from '@testing-library/react-native';
import EmptyRideList from '../../../src/components/RideHistory/EmptyRideList';

describe('EmptyRideList', () => {
  it('renders image and the empty message', () => {
    const { getByText, getByRole } = render(<EmptyRideList />);
    // text
    expect(getByText('Tuščias kelionių sąrašas')).toBeTruthy();
    // image alt fallback: find by accessibility role
    const img = getByRole('image');
    expect(img.props.source).toMatchObject(
      expect.objectContaining({ testUri: expect.stringContaining('empty_ride.png') })
    );
  });
});
