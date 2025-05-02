import React from 'react';
import { render } from '@testing-library/react-native';
import VerticalDashLine from '../../../src/components/RideMapView/VerticalDashLine';
import DashedLine from 'react-native-dashed-line';

describe('VerticalDashLine', () => {
  it('renders a DashedLine with vertical axis and expected style', () => {
    const { UNSAFE_getByType } = render(<VerticalDashLine />);
    const dl = UNSAFE_getByType(DashedLine);
    expect(dl.props.axis).toBe('vertical');
    expect(dl.props.dashLength).toBe(3);
    expect(dl.props.dashThickness).toBe(1);
    // style height includes ~45
    expect(dl.props.style).toEqual(
      expect.objectContaining({ height: 45, marginLeft: expect.any(Number) })
    );
  });
});
