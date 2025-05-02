import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StatusModal from '../../../src/components/UserVehicleScreen/StatusModal';

describe('StatusModal', () => {
  it('renders nothing when not visible', () => {
    const { queryByText } = render(
      <StatusModal modalVisible={false} setModalVisible={jest.fn()} modalMessage="Hello" />
    );
    expect(queryByText('Hello')).toBeNull();
  });

  it('shows message and calls setModalVisible(false) on OK', () => {
    const setModalVisible = jest.fn();
    const { getByText } = render(
      <StatusModal modalVisible={true} setModalVisible={setModalVisible} modalMessage="Test message" />
    );
    expect(getByText('Test message')).toBeTruthy();
    const ok = getByText('OK');
    fireEvent.press(ok);
    expect(setModalVisible).toHaveBeenCalledWith(false);
  });
});
