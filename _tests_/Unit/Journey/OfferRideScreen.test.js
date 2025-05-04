import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';


jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({
    params: {
      pickupAddress: 'P1',
      destinationAddress: 'D1',
      journeyDateTime: '2025-06-01T12:00',
      seats: 3,
      journeyType: 'offer',
      price: 10,
      facilities: 'None',
    },
  }),
}));

jest.mock('../../../src/components/myStatusBar', () => () => {
  const React = require('react');
  const { View } = require('react-native');
  return React.createElement(View, { testID: 'statusbar' });
});
jest.mock('../../../src/components/header', () => props => {
  const React = require('react');
  const { Text } = require('react-native');
  return React.createElement(Text, { testID: 'header' }, props.title);
});
jest.mock('../../../src/components/OfferRide/LocationInfo', () => props => {
  const React = require('react');
  const { View } = require('react-native');
  return React.createElement(View, { testID: 'loc-info' });
});
jest.mock('../../../src/components/OfferRide/PriceInfo', () => props => {
  const React = require('react');
  const { View } = require('react-native');
  return React.createElement(View, { testID: 'price-info' });
});
jest.mock('../../../src/components/OfferRide/CarInfo', () => props => {
  const React = require('react');
  const { View, Button } = require('react-native');
  return React.createElement(View, { testID: 'car-info' }, [
    React.createElement(Button, {
      key: 'open',
      testID: 'car-open',
      title: 'PickCar',
      onPress: props.onPress,
    }),
  ]);
});
jest.mock('../../../src/components/OfferRide/SeatInfo', () => props => {
  const React = require('react');
  const { View } = require('react-native');
  return React.createElement(View, { testID: 'seat-info' });
});
jest.mock('../../../src/components/OfferRide/FacilityInfo', () => props => {
  const React = require('react');
  const { View } = require('react-native');
  return React.createElement(View, { testID: 'fac-info' });
});
jest.mock('../../../src/components/OfferRide/ContinueButton', () => props => {
  const React = require('react');
  const { Button } = require('react-native');
  return React.createElement(Button, {
    testID: 'continue',
    title: 'Continue',
    onPress: props.onPress,
    disabled: props.disabled,
  });
});
jest.mock('../../../src/components/OfferRide/CarSelectionSheet', () => props => {
  const React = require('react');
  const { View, Button } = require('react-native');
  return React.createElement(View, { testID: 'car-sheet' }, [
    React.createElement(Button, {
      key: 'select',
      testID: 'car-select',
      title: 'SelectCar',
      onPress: () => props.onSelect('MyCar'),
    }),
    React.createElement(Button, {
      key: 'close',
      testID: 'car-close',
      title: 'CloseCar',
      onPress: props.onClose,
    }),
  ]);
});
jest.mock('../../../src/components/OfferRide/SeatSelectionSheet', () => props => {
  const React = require('react');
  const { View } = require('react-native');
  return React.createElement(View, { testID: 'seat-sheet' });
});

const mockCreateJourney = jest.fn();
jest.mock('../../../src/hooks/useCreateJourney', () => () => ({
  createJourney: mockCreateJourney,
  loading: false,
}));
jest.mock('../../../src/hooks/useFetchVehicles', () => ({
  useFetchVehicles: () => ({
    vehicles: [{ vehicleName: 'MyCar' }],
  }),
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

import OfferRideScreen from '../../../src/screens/TemplateJourney/offerRide/offerRideScreen';

describe('<OfferRideScreen />', () => {
  let mockNavigate;
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateJourney.mockResolvedValue('JID123');
    mockNavigate = jest.fn();
  });

  const renderScreen = () =>
    render(<OfferRideScreen navigation={{ navigate: mockNavigate }} />);

  it('renders all major sections', () => {
    const { getByTestId } = renderScreen();
    expect(getByTestId('statusbar')).toBeTruthy();
    expect(getByTestId('header').props.children).toBe('Kelionės pasiūlymas');
    [
      'loc-info',
      'price-info',
      'car-info',
      'seat-info',
      'fac-info',
      'continue',
      'car-sheet',
      'seat-sheet',
    ].forEach((id) => expect(getByTestId(id)).toBeTruthy());
  });

  it('alerts "missing car" when you try to continue without selecting a car', () => {
    const { getByTestId } = renderScreen();
    fireEvent.press(getByTestId('continue'));
    expect(Alert.alert).toHaveBeenCalledWith(
      'Trūksta automobilio',
      'Prašome pasirinkti savo automobilį.'
    );
  });

  it('creates journey and navigates on success', async () => {
    const { getByTestId } = renderScreen();
    fireEvent.press(getByTestId('car-open'));
    fireEvent.press(getByTestId('car-select'));
    fireEvent.press(getByTestId('continue'));
    await waitFor(() => {
      expect(mockCreateJourney).toHaveBeenCalledWith({
        pickupAddress: 'P1',
        destinationAddress: 'D1',
        journeyDateTime: '2025-06-01T12:00',
        seats: 3,
        journeyType: 'offer',
        car: 'MyCar',
        price: 10,
        facilities: 'None',
      });
      expect(mockNavigate).toHaveBeenCalledWith('ConfirmPoolingScreen', {
        journeyId: 'JID123',
      });
    });
  });
});