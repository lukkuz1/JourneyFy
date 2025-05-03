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
});
