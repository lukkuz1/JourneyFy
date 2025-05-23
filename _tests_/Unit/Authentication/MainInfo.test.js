
import React from 'react';
import { Alert, Text, TextInput, Button } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('../../../src/services/firebase', () => ({
  db: {},
}));
jest.mock('firebase/auth', () => ({
  getAuth: () => ({ currentUser: { uid: 'user1' } }),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn((db, col, uid) => ({ db, col, uid })),
  setDoc: jest.fn(),
}));

jest.mock(
  '../../../src/components/Entry/EntryInputField',
  () => props => {
    const React = require('react');
    const { TextInput } = require('react-native');
    return (
      <TextInput
        testID={props.headerText}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholderText}
      />
    );
  }
);
jest.mock(
  '../../../src/components/Entry/EntryButton',
  () => props => {
    const React = require('react');
    const { Button } = require('react-native');
    return (
      <Button
        testID="submit-button"
        title={props.text}
        onPress={props.onPress}
      />
    );
  }
);

import MainInfo from '../../../src/screens/Entry/MainInfo';
import { setDoc, doc } from 'firebase/firestore';

describe('MainInfo screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  it('shows validation error when fields are empty', () => {
    const { getByTestId, getByText } = render(<MainInfo />);
    fireEvent.press(getByTestId('submit-button'));
    expect(getByText('Užpildykite visus laukus')).toBeTruthy();
    expect(setDoc).not.toHaveBeenCalled();
  });

  it('saves info, alerts success, navigates, and clears inputs on valid data', async () => {
    setDoc.mockResolvedValue();
    const { getByTestId, queryByText } = render(<MainInfo />);

    fireEvent.changeText(getByTestId('Slapyvardis'), 'user123');
    fireEvent.changeText(getByTestId('Vardas'), 'John');
    fireEvent.changeText(getByTestId('Pavardė'), 'Doe');
    fireEvent.changeText(getByTestId('Gimimo data'), '1990-01-01');

    fireEvent.press(getByTestId('submit-button'));

    await waitFor(() => {
      expect(doc).toHaveBeenCalledWith(
        {},
        'users',
        'user1'
      );
      expect(setDoc).toHaveBeenCalledWith(
        { db: {}, col: 'users', uid: 'user1' },
        {
          username: 'user123',
          name: 'John',
          surname: 'Doe',
          dateOfBirth: '1990-01-01',
        }
      );

      expect(Alert.alert).toHaveBeenCalledWith(
        'Sėkmės pranešimas',
        'Naudotojo informacija sėkmingai išsaugota'
      );
      expect(mockNavigate).toHaveBeenCalledWith('Login');

      expect(queryByText('Užpildykite visus laukus')).toBeNull();
    });
  });

  it('shows error on setDoc failure', async () => {
    setDoc.mockRejectedValue(new Error('fail'));
    const { getByTestId, getByText } = render(<MainInfo />);

    fireEvent.changeText(getByTestId('Slapyvardis'), 'u');
    fireEvent.changeText(getByTestId('Vardas'), 'J');
    fireEvent.changeText(getByTestId('Pavardė'), 'D');
    fireEvent.changeText(getByTestId('Gimimo data'), '2000-12-31');

    fireEvent.press(getByTestId('submit-button'));

    await waitFor(() =>
      expect(getByText('Klaida išsaugant naudotojo informacija')).toBeTruthy()
    );
  });
});
