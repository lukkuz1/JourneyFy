import React from 'react';
import { render } from '@testing-library/react-native';
import DirectionMap from '../../../src/components/RideMapView/DirectionMap';

// Mock react-native-maps
jest.mock('react-native-maps', () => {
  const React = require('react');
  const { View } = require('react-native');
  const MockMapView = ({ children, ...props }) => React.createElement(View, props, children);
  const MockMarker = ({ children, ...props }) => React.createElement(View, props, children);
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
    PROVIDER_GOOGLE: 'google',
  };
});

// Mock directions
jest.mock('react-native-maps-directions', () => {
  const React = require('react');
  return ({ children, ...props }) => React.createElement('MapViewDirections', props, children);
});

describe('DirectionMap', () => {
  it('renders 4 MapViewDirections and 5 Markers', () => {
    const { getAllByType } = render(<DirectionMap />);
    // MapViewDirections render as 'MapViewDirections' host elements
    expect(getAllByType('MapViewDirections')).toHaveLength(4);
    // Marker are mocked as View, but we can query by props.type
    // Our mock Marker returns a View, so we count by marker coordinates prop
    const markers = getAllByType('View').filter(
      el => el.props.coordinate != null
    );
    expect(markers).toHaveLength(5);
  });
});
