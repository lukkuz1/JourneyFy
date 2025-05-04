import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

jest.mock('../../../src/services/firebase', () => ({
  auth: { currentUser: { uid: 'user123' } },
  db: {},
}));

const mockAddDoc = jest.fn();
const mockCollection = jest.fn();
mockCollection.mockReturnValue('dummy-collection-ref');

jest.mock('firebase/firestore', () => ({
  collection: (...args) => mockCollection(...args),
  addDoc: (...args) => mockAddDoc(...args),
  serverTimestamp: () => ({ ts: true }),
}));

jest.mock('../../../src/hooks/useMessages', () => ({
  __esModule: true,
  default: rideId => [`msg-for-${rideId}`],
}));
jest.mock('../../../src/hooks/useRideAndDriver', () => ({
  __esModule: true,
  default: rideId => [{ id: rideId, userId: 'driverX' }, { id: 'driverX' }],
}));

jest.mock('../../../src/components/myStatusBar', () => () => {
  const React = require('react');
  const { View } = require('react-native');
  return React.createElement(View, { testID: 'statusbar' });
});
jest.mock('../../../src/components/Message/MessageHeader', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return props =>
    React.createElement(
      View,
      { testID: 'header' },
      React.createElement(Text, { testID: 'header-driver' }, props.driver.id),
      React.createElement(Text, { testID: 'header-ride' }, props.ride.id)
    );
});
jest.mock('../../../src/components/Message/MessageList', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return props =>
    React.createElement(
      View,
      { testID: 'list' },
      React.createElement(Text, { testID: 'list-items' }, JSON.stringify(props.messages))
    );
});
jest.mock('../../../src/components/Message/MessageInput', () => {
  const React = require('react');
  const { View, Button } = require('react-native');
  return props =>
    React.createElement(
      View,
      { testID: 'input' },
      React.createElement(Button, {
        testID: 'send-button',
        title: 'Send',
        onPress: () => props.onSend('hello'),
      })
    );
});

import MessageScreen from '../../../src/screens/TemplateJourney/message/messageScreen';

describe('<MessageScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCollection.mockReturnValue('dummy-collection-ref');
  });

  it('renders header, list, and input', () => {
    const { getByTestId } = render(
      <MessageScreen navigation={{ navigate: jest.fn() }} route={{ params: { rideId: 'R1' } }} />
    );
    expect(getByTestId('statusbar')).toBeTruthy();
    expect(getByTestId('header-driver').props.children).toBe('driverX');
    expect(getByTestId('header-ride').props.children).toBe('R1');
    expect(getByTestId('list-items').props.children).toBe(JSON.stringify(['msg-for-R1']));
    expect(getByTestId('send-button')).toBeTruthy();
  });

  it('sends a message when the input button is pressed', async () => {
    const { getByTestId } = render(
      <MessageScreen navigation={{ navigate: jest.fn() }} route={{ params: { rideId: 'RID42' } }} />
    );
    fireEvent.press(getByTestId('send-button'));

    await waitFor(() => {
      expect(mockCollection).toHaveBeenCalledWith({}, 'journeys', 'RID42', 'messages');
      expect(mockAddDoc).toHaveBeenCalledWith(
        'dummy-collection-ref',
        expect.objectContaining({
          text: 'hello',
          senderId: 'user123',
          createdAt: { ts: true },
        })
      );
    });
  });
});
