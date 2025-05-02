import React from 'react';
import { render } from '@testing-library/react-native';
import RideHistoryList from '../../../src/components/RideHistory/RideHistoryList';

describe('RideHistoryList', () => {
  const rides = [
    { id: '1' },
    { id: '2' },
  ];
  const mockNav = { navigate: jest.fn() };

  it('renders a list of RideHistoryItem components', () => {
    const { getAllByTestId } = render(
      <RideHistoryList rides={rides} navigation={mockNav} />
    );
    // Expect two items
    expect(getAllByTestId('ride-history-item')).toHaveLength(2);
  });
});
