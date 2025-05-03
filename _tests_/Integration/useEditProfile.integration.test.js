import React from 'react';
import { Text, Button, Alert } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

const mockHandleUpdate = jest.fn();


jest.mock('../../src/hooks/useEditProfile', () => ({
  useEditProfile: () => ({
    firstName: 'MockFirst',
    lastName: 'MockLast',
    phoneNumber: '0000',
    dateOfBirth: '2000-01-01',
    handleUpdateProfile: mockHandleUpdate,
    loading: false,
  }),
}));


jest.spyOn(Alert, 'alert').mockImplementation(() => {});


import { useEditProfile } from '../../src/hooks/useEditProfile';


const TestComponent = () => {
  const { firstName, loading, handleUpdateProfile } = useEditProfile();
  return (
    <>
      <Text testID="firstName">{firstName}</Text>
      <Text testID="loading">{String(loading)}</Text>
      <Button title="Update" onPress={handleUpdateProfile} />
    </>
  );
};

describe('useEditProfile integration (mocked)', () => {
  beforeEach(() => {
    mockHandleUpdate.mockClear();
  });

  it('renders mock values and calls handleUpdateProfile', () => {
    const { getByTestId, getByText } = render(<TestComponent />);

    expect(getByTestId('firstName').props.children).toBe('MockFirst');
    expect(getByTestId('loading').props.children).toBe('false');

    fireEvent.press(getByText('Update'));
    expect(mockHandleUpdate).toHaveBeenCalled();
  });
});