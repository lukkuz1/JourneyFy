import React from 'react';
import { Text } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';


jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
}));


import useDriver from '../../src/hooks/useDriver';
import { getFirestore, doc, getDoc } from 'firebase/firestore';


const TestComponent = ({ userId }) => {
  const driver = useDriver(userId);
  return (
    <Text testID="driver">
      {driver ? driver.name : 'null'}
    </Text>
  );
};

describe('useDriver integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null and does not fetch when no userId is given', () => {
    const { getByTestId } = render(<TestComponent userId={null} />);
    expect(getByTestId('driver').props.children).toBe('null');
    expect(getDoc).not.toHaveBeenCalled();
  });

  it('fetches driver data and updates state when userId is provided', async () => {
    const fakeDbRef = {};
    const fakeDocRef = {};
    getFirestore.mockReturnValue(fakeDbRef);
    doc.mockReturnValue(fakeDocRef);
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ name: 'John Doe', age: 42 }),
    });

    const { getByTestId } = render(<TestComponent userId="user123" />);

    await waitFor(() => {
      expect(getDoc).toHaveBeenCalledWith(fakeDocRef);
    });

    expect(getByTestId('driver').props.children).toBe('John Doe');
  });
});
