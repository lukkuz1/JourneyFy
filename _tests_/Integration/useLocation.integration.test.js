// _tests_/Integration/useLocation.integration.test.js
import React from 'react';
import { Text } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
  reverseGeocodeAsync: jest.fn(),
}));

import * as Location from 'expo-location';
import { useLocation } from '../../src/hooks/useLocation';

const TestComponent = () => {
  const location = useLocation();
  return <Text testID="location">{location}</Text>;
};

describe('useLocation integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('stays at default when permission is denied', async () => {
    Location.requestForegroundPermissionsAsync.mockResolvedValue({ status: 'denied' });

    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('location').props.children).toBe('Lietuva');
    await new Promise((r) => setTimeout(r, 0));
    expect(getByTestId('location').props.children).toBe('Lietuva');
  });

  it('updates to the country from reverseGeocode when granted', async () => {
    Location.requestForegroundPermissionsAsync.mockResolvedValue({ status: 'granted' });
    Location.getCurrentPositionAsync.mockResolvedValue({
      coords: { latitude: 10, longitude: 20 },
    });
    Location.reverseGeocodeAsync.mockResolvedValue([{ country: 'TestLand' }]);

    const { getByTestId } = render(<TestComponent />);


    expect(getByTestId('location').props.children).toBe('Lietuva');


    await waitFor(() =>
      expect(getByTestId('location').props.children).toBe('TestLand')
    );
  });
});