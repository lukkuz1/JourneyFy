import React from 'react';
import { render } from '@testing-library/react-native';
import NoRidesInfo from '../../../src/components/Rides/NoRidesInfo';

describe('NoRidesInfo', () => {
  it('renders empty state image and text', () => {
    const { getByText, getByRole } = render(<NoRidesInfo />);

    // The placeholder text
    expect(getByText('Tuščias kelionių sąrašas')).toBeTruthy();

    // At least one image is rendered
    const img = getByRole('image');
    expect(img).toBeTruthy();
  });
});
