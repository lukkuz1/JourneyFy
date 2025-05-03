import React from 'react';
import { render } from '@testing-library/react-native';
import RideInfoSheet from '../../../src/components/StartRide/RideInfoSheet';

describe('RideInfoSheet', () => {
  it('returns null when no ride is passed', () => {
    const { toJSON } = render(<RideInfoSheet ride={null} passengers={[]} />);
    expect(toJSON()).toBeNull();
  });
});
