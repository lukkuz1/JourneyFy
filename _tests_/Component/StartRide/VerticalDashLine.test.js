import React from 'react';
import { render } from '@testing-library/react-native';
import VerticalDashLine from '../../../src/components/StartRide/VerticalDashLine';
import DashedLine from 'react-native-dashed-line';

describe('VerticalDashLine', () => {
  it('renders a DashedLine with correct props', () => {
    const { getByType } = render(<VerticalDashLine />);
    const dash = getByType(DashedLine);
    expect(dash.props.axis).toBe('vertical');
    expect(dash.props.dashLength).toBe(3);
    expect(dash.props.dashThickness).toBe(1);
    expect(dash.props.dashColor).toBeDefined();
  });
});
