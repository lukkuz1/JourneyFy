// _tests_/Integration/useMapSettings.integration.test.js
import React from 'react';
import { Text, Button, Alert } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';
import { fireEvent } from '@testing-library/react-native';


jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
}));
jest.mock('../../src/services/firebase', () => ({
  db: {},
}));


jest.spyOn(Alert, 'alert').mockImplementation(() => {});


import { useMapSettings } from '../../src/hooks/useMapSettings';
import { doc, getDoc, setDoc } from 'firebase/firestore';


const TestComponent = ({ userId }) => {
  const {
    loading,
    radius,
    stops,
    populateRadius,
    populateStops,
    handleUpdateMapData,
  } = useMapSettings(userId);
  return (
    <>
      <Text testID="loading">{String(loading)}</Text>
      <Text testID="radius">{radius}</Text>
      <Text testID="stops">{stops}</Text>
      <Text testID="populateRadius">{populateRadius}</Text>
      <Text testID="populateStops">{populateStops}</Text>
      <Button title="Update" onPress={handleUpdateMapData} />
    </>
  );
};

describe('useMapSettings integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    doc.mockReturnValue('mapDocRef');
  });

  it('when no userId is provided, loading becomes false and no fetch occurs', async () => {
    const { getByTestId } = render(<TestComponent userId={null} />);


    await waitFor(() =>
      expect(getByTestId('loading').props.children).toBe('false')
    );

    expect(getByTestId('radius').props.children).toBe('');
    expect(getByTestId('stops').props.children).toBe('');
    expect(getByTestId('populateRadius').props.children).toBe('');
    expect(getByTestId('populateStops').props.children).toBe('');
    expect(getDoc).not.toHaveBeenCalled();
  });

  it('fetches existing map data and populates state when userId is provided', async () => {
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ radius: 15, stops: 3 }),
    });

    const { getByTestId } = render(<TestComponent userId="user123" />);


    await waitFor(() =>
      expect(getDoc).toHaveBeenCalledWith('mapDocRef')
    );

    expect(getByTestId('loading').props.children).toBe('false');
    expect(getByTestId('radius').props.children).toBe('15');
    expect(getByTestId('stops').props.children).toBe('3');
    expect(getByTestId('populateRadius').props.children).toBe('15');
    expect(getByTestId('populateStops').props.children).toBe('3');
  });
});