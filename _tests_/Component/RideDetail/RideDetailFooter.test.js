import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RideDetailFooter from '../../../src/components/RideDetail/RideDetailFooter';

jest.mock('../../../src/services/firebase', () => ({
  auth: {
    currentUser: { uid: 'user1' }
  }
}));

describe('RideDetailFooter', () => {
  const baseNavigation = { navigate: jest.fn() };

  it('shows only Messages when user is driver', () => {
    const ride = { userId: 'user1', passengers: [] };
    const { queryByText, getByText } = render(
      <RideDetailFooter ride={ride} navigation={baseNavigation} />
    );
    expect(queryByText('Prisijungti')).toBeNull();
    expect(queryByText('Atšaukti kelionę')).toBeNull();
    // Messages button always present
    fireEvent.press(getByText('Žinutės'));
    expect(baseNavigation.navigate).toHaveBeenCalledWith('MessageScreen', { rideId: undefined });
  });

  it('shows Register when not driver and not registered', () => {
    const ride = { userId: 'other', passengers: [] };
    const onRegisterPress = jest.fn();
    const { getByText } = render(
      <RideDetailFooter ride={ride} navigation={baseNavigation} onRegisterPress={onRegisterPress} />
    );
    fireEvent.press(getByText('Prisijungti'));
    expect(onRegisterPress).toHaveBeenCalled();
  });

  it('shows Cancel when already registered', () => {
    const ride = { userId: 'other', passengers: ['user1'] };
    const onCancelPress = jest.fn();
    const { getByText } = render(
      <RideDetailFooter ride={ride} navigation={baseNavigation} onCancelPress={onCancelPress} />
    );
    fireEvent.press(getByText('Atšaukti kelionę'));
    expect(onCancelPress).toHaveBeenCalled();
  });
});
