/**
 * __tests__/MainInfo.test.js
 */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import firebaseServices from '../src/services/firebase';
import MainInfo from '../../../src/screens/Entry/MainInfo';

// --- mocks ---
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
}));
jest.mock('../src/services/firebase', () => ({
  db: {},
}));
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));
jest.spyOn(Alert, 'alert');

describe('<MainInfo />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // stub currentUser
    getAuth.mockReturnValue({
      currentUser: { uid: 'user123' },
    });
    // stub doc() to just return a dummy ref
    doc.mockReturnValue({ _path: 'users/user123' });
  });

  it('shows validation error if any field is empty', () => {
    const { getByText, queryByText } = render(<MainInfo />);

    expect(queryByText('Užpildykite visus laukus')).toBeNull();
    fireEvent.press(getByText('Pateikti'));
    // error message appears
    expect(queryByText('Užpildykite visus laukus')).not.toBeNull();
  });

  it('saves info, alerts success and navigates', async () => {
    setDoc.mockResolvedValueOnce();  // simulate success

    const { getByPlaceholderText, getByText, queryByText } = render(<MainInfo />);

    // fill out all fields
    fireEvent.changeText(getByPlaceholderText('Įveskite savo slapyvardį'), 'nick');
    fireEvent.changeText(getByPlaceholderText('Įveskite savo vardą'), 'John');
    fireEvent.changeText(getByPlaceholderText('Įveskite savo pavardę'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('YYYY-MM-DD'), '1990-01-01');

    fireEvent.press(getByText('Pateikti'));

    await waitFor(() => {
      // setDoc called with correct args
      expect(doc).toHaveBeenCalledWith(firebaseServices.db, 'users', 'user123');
      expect(setDoc).toHaveBeenCalledWith(
        { _path: 'users/user123' },
        {
          username: 'nick',
          name: 'John',
          surname: 'Doe',
          dateOfBirth: '1990-01-01',
        }
      );
      // success alert
      expect(Alert.alert).toHaveBeenCalledWith(
        'Sėkmės pranešimas',
        'Naudotojo informacija sėkmingai išsaugota'
      );
      // navigated back to Login
      expect(mockNavigate).toHaveBeenCalledWith('Login');
      // error should be cleared
      expect(queryByText('Užpildykite visus laukus')).toBeNull();
    });
  });

  it('shows error if setDoc fails', async () => {
    setDoc.mockRejectedValueOnce(new Error('Oh no'));

    const { getByPlaceholderText, getByText, queryByText } = render(<MainInfo />);

    // fill fields
    fireEvent.changeText(getByPlaceholderText('Įveskite savo slapyvardį'), 'nick');
    fireEvent.changeText(getByPlaceholderText('Įveskite savo vardą'), 'John');
    fireEvent.changeText(getByPlaceholderText('Įveskite savo pavardę'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('YYYY-MM-DD'), '1990-01-01');

    fireEvent.press(getByText('Pateikti'));

    await waitFor(() => {
      expect(setDoc).toHaveBeenCalled();
      // error message displays
      expect(queryByText('Klaida išsaugant naudotojo informacija')).not.toBeNull();
    });
  });
});
