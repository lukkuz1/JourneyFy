import React from 'react';
import { Text, Button, Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';


jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  collection: jest.fn(),
  setDoc: jest.fn(),
  deleteDoc: jest.fn(),
  updateDoc: jest.fn(),
  arrayUnion: jest.fn(),
  arrayRemove: jest.fn(),
  serverTimestamp: jest.fn(),
}));

jest.mock('../../src/services/firebase', () => ({
  db: {},
  auth: { currentUser: { uid: 'user123' } },
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

import useRegistration from '../../src/hooks/useRegistration';
import { setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const TestComponent = ({ rideId, initialPassengers, onPassengersChange, onCloseDialog, onGoBack }) => {
  const { isRegistered, loading, register, cancel } = useRegistration(
    rideId,
    initialPassengers,
    onPassengersChange,
    onCloseDialog,
    onGoBack
  );
  return (
    <>
      <Text testID="isRegistered">{String(isRegistered)}</Text>
      <Text testID="loading">{String(loading)}</Text>
      <Button title="Register" onPress={register} />
      <Button title="Cancel" onPress={cancel} />
    </>
  );
};

describe('useRegistration integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('registers the user and calls callbacks', async () => {
    const onPassengersChange = jest.fn();
    const onCloseDialog = jest.fn();
    const onGoBack = jest.fn();

    const { getByTestId, getByText } = render(
      <TestComponent
        rideId="ride1"
        initialPassengers={[]}
        onPassengersChange={onPassengersChange}
        onCloseDialog={onCloseDialog}
        onGoBack={onGoBack}
      />
    );

    expect(getByTestId('isRegistered').props.children).toBe('false');
    expect(getByTestId('loading').props.children).toBe('false');

    fireEvent.press(getByText('Register'));

    await waitFor(() =>
      expect(getByTestId('loading').props.children).toBe('false')
    );

    expect(setDoc).toHaveBeenCalled();
    expect(updateDoc).toHaveBeenCalled();

    expect(onPassengersChange).toHaveBeenCalled();

    expect(Alert.alert).toHaveBeenCalledWith('Užsiregistravote');
  });

  it('cancels the registration and calls callbacks', async () => {
    const onPassengersChange = jest.fn();
    const onCloseDialog = jest.fn();
    const onGoBack = jest.fn();

    const { getByTestId, getByText } = render(
      <TestComponent
        rideId="ride1"
        initialPassengers={['user123']}
        onPassengersChange={onPassengersChange}
        onCloseDialog={onCloseDialog}
        onGoBack={onGoBack}
      />
    );

    expect(getByTestId('isRegistered').props.children).toBe('true');
    expect(getByTestId('loading').props.children).toBe('false');

    fireEvent.press(getByText('Cancel'));

    await waitFor(() =>
      expect(getByTestId('loading').props.children).toBe('false')
    );

    expect(deleteDoc).toHaveBeenCalled();
    expect(updateDoc).toHaveBeenCalled();

    expect(onPassengersChange).toHaveBeenCalled();
    expect(onCloseDialog).toHaveBeenCalled();
    expect(onGoBack).toHaveBeenCalled();

    expect(Alert.alert).toHaveBeenCalledWith('Registracija atšaukta');
  });
});