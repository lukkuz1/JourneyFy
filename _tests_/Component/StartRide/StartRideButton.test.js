import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import StartRideButton from '../../../src/components/StartRide/StartRideButton';
import { Alert } from 'react-native';
import { updateDoc } from 'firebase/firestore';
import firebase from '../src/services/firebase';

jest.mock('firebase/firestore', () => ({
  updateDoc: jest.fn(),
  doc: jest.fn(),
}));

jest.mock('../src/services/firebase', () => ({
  db: {},
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('StartRideButton', () => {
  const navigation = { navigate: jest.fn() };
  const ride = { id: 'ride123' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders button text', () => {
    const { getByText } = render(<StartRideButton navigation={navigation} ride={ride} />);
    expect(getByText('Pradėti kelionę')).toBeTruthy();
  });

  it('on press calls updateDoc, shows alert and navigates', async () => {
    updateDoc.mockResolvedValue();
    const { getByText } = render(<StartRideButton navigation={navigation} ride={ride} />);

    await act(async () => {
      fireEvent.press(getByText('Pradėti kelionę'));
    });

    expect(updateDoc).toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith('Kelionė pradėta');
    expect(navigation.navigate).toHaveBeenCalledWith('EndRideScreen', { rideId: 'ride123' });
  });

  it('on error shows error alert', async () => {
    const error = new Error('fail');
    updateDoc.mockRejectedValue(error);

    const { getByText } = render(<StartRideButton navigation={navigation} ride={ride} />);

    await act(async () => {
      fireEvent.press(getByText('Pradėti kelionę'));
    });

    expect(Alert.alert).toHaveBeenCalledWith('Klaida pradedant kelionę', 'fail');
  });
});
