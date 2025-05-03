// _tests_/Integration/useMessages.integration.test.js
import React from 'react';
import { Text } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';



jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
  onSnapshot: jest.fn(),
}));
jest.mock('../../src/services/firebase', () => ({
  db: {},
  auth: { currentUser: { uid: 'user1' } },
}));


jest.mock('../../src/utils/formatTime', () => ({
  formatTime: jest.fn(ts => `time:${ts}`),
}));

import useMessages from '../../src/hooks/useMessages';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const TestComponent = ({ rideId }) => {
  const messages = useMessages(rideId);
  return <Text testID="msgs">{JSON.stringify(messages)}</Text>;
};

describe('useMessages integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns empty array when no rideId is provided', () => {
    const { getByTestId } = render(<TestComponent rideId={null} />);
    expect(getByTestId('msgs').props.children).toBe('[]');
    expect(onSnapshot).not.toHaveBeenCalled();
  });

  it('subscribes and updates messages when rideId is provided', async () => {
    const fakeDocs = [
      { id: 'm1', data: () => ({ text: 'Hello', senderId: 'user1', createdAt: 123 }) },
      { id: 'm2', data: () => ({ text: 'World', senderId: 'other', createdAt: 456 }) },
    ];
    onSnapshot.mockImplementation((_, onNext) => {
      onNext({ docs: fakeDocs });
      return () => {};
    });
    collection.mockReturnValue('colRef');
    query.mockReturnValue('queryRef');
    orderBy.mockReturnValue('orderByRef');

    const { getByTestId } = render(<TestComponent rideId="ride123" />);

    await waitFor(() => {
      expect(onSnapshot).toHaveBeenCalled();
    });

    const msgs = JSON.parse(getByTestId('msgs').props.children);
    expect(Array.isArray(msgs)).toBe(true);
    expect(msgs).toHaveLength(2);
    expect(msgs[0]).toMatchObject({
      id: 'm1',
      message: 'Hello',
      senderId: 'user1',
      isSender: true,
      time: 'time:123',
    });
    expect(msgs[1]).toMatchObject({
      id: 'm2',
      message: 'World',
      senderId: 'other',
      isSender: false,
      time: 'time:456',
    });
  });
});