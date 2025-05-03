import React from 'react';
import { render } from '@testing-library/react-native';
import RideInfoSheet from '../../../src/components/RideMapView/RideInfoSheet';
import VerticalDashLine from '../../../src/components/RideMapView/VerticalDashLine';

// Mock native bottom sheet and animatable
jest.mock('react-native-simple-bottom-sheet', () => {
  const React = require('react');
  const { View } = require('react-native');
  return ({ children, ...props }) => React.createElement(View, props, children({}));
});
jest.mock('react-native-animatable', () => {
  const React = require('react');
  return {
    View: ({ children, ...props }) => React.createElement('AnimatableView', props, children),
  };
});

// Mock VerticalDashLine (it's our own, test separately)
jest.mock('../../../src/components/RideMapView/VerticalDashLine', () => {
  const React = require('react');
  return () => React.createElement('VerticalDashLine', null, null);
});

describe('RideInfoSheet', () => {
  it('renders all five steps with correct labels', () => {
    const { getByText } = render(<RideInfoSheet />);

    // title
    expect(getByText('Ride start on 25 june 2023')).toBeTruthy();

    // step labels
    expect(getByText('Kelionės pradžia')).toBeTruthy();
    expect(getByText('Pick up point (10:00 am)')).toBeTruthy();
    expect(getByText('Vairuoti')).toBeTruthy();
    expect(getByText('Destination point (11:00 am)')).toBeTruthy();
    expect(getByText('Ride end')).toBeTruthy();
  });
});
