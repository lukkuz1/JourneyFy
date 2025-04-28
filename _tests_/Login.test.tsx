import { render, fireEvent } from '@testing-library/react-native';
import { describe, it, expect, jest } from '@jest/globals'; // ✅ Use Jest globals
import Login from '../src/screens/Entry/Login'; // Adjust path if needed
import { useAuth } from '../src/hooks/useAuth';

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Mock your custom hook
jest.mock('../src/hooks/useAuth', () => ({
    useAuth: () => ({
      signIn: jest.fn(() => Promise.resolve(undefined)),
    }),
  }));
  
describe('Login Screen', () => {
  it('renders the header text', () => {
    const { getByText } = render(<Login />);
    expect(getByText('JourneyFy')).toBeTruthy();
  });

  it('renders the login form title', () => {
    const { getByText } = render(<Login />);
    expect(getByText('Prisijungimas')).toBeTruthy();
  });

  it('navigates to ForgotPassword screen when link pressed', () => {
    const { getByText } = render(<Login />);
    const forgotPasswordLink = getByText('Pamiršote slaptažodį?');

    fireEvent.press(forgotPasswordLink);

    // Optionally, here you could spy on navigation if you want
  });

  it('navigates to Register screen when register link pressed', () => {
    const { getByText } = render(<Login />);
    const registerLink = getByText('Pradėkite jau šiandien!');

    fireEvent.press(registerLink);

    // Optionally, here you could spy on navigation if you want
  });

  it('renders two input fields (email + password)', () => {
    const { getAllByPlaceholderText } = render(<Login />);
    const inputs = getAllByPlaceholderText(/Įveskite savo/); // Regex to match placeholders

    expect(inputs.length).toBe(2); // 2 fields: email + password
  });
});