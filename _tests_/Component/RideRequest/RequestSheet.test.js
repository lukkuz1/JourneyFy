import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import RequestSheet from '../../../src/components/RideRequest/RequestSheet';

// Mock Overlay to render children only when isVisible=true
jest.mock('@rneui/themed', () => ({
  Overlay: ({ isVisible, children }) => isVisible ? children : null,
}));

// Mock firebase/firestore
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(() => Promise.resolve({ exists: () => false })),
}));

describe('RequestSheet', () => {
  const onApprove = jest.fn();
  const onClose = jest.fn();

  it('shows "no waiting passengers" when there are none', async () => {
    const { queryByText } = render(
      <RequestSheet
        isVisible={true}
        ride={{}}
        requestUsers={[]}
        onApprove={onApprove}
        onClose={onClose}
      />
    );

    // Wait for the effect to settle
    await waitFor(() => {
      expect(queryByText('Nėra laukiančių keleivių')).toBeTruthy();
    });
  });
});
