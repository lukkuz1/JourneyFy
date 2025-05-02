/**
 * __tests__/ForgotPassword.test.js
 */
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import firebase from "../services/firebase"; // adjust path as needed
import ForgotPassword from "../../../src/screens/Entry/ForgotPassword";

// 1) mock the auth service call
jest.mock("firebase/auth", () => ({
  sendPasswordResetEmail: jest.fn(),
}));

// 2) mock firebase.auth
jest.mock("../services/firebase", () => ({
  auth: {},           // whatever your component passes to sendPasswordResetEmail
}));

// 3) mock navigation
const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

// spy on Alert.alert
jest.spyOn(Alert, "alert");

describe("ForgotPassword screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("alerts if email is empty", () => {
    const { getByText } = render(<ForgotPassword />);
    fireEvent.press(getByText("Priminti slaptažodį"));
    expect(Alert.alert).toHaveBeenCalledWith(
      "Neteisingas el. paštas",
      "Prašome įvesti teisingą el. paštą."
    );
  });

  it("sends reset email on valid input and navigates", async () => {
    sendPasswordResetEmail.mockResolvedValueOnce(); // simulate success
    const { getByText, getByPlaceholderText } = render(<ForgotPassword />);

    // type a valid email
    fireEvent.changeText(
      getByPlaceholderText("pavyzdys@gmail.com"),
      "test@example.com"
    );
    fireEvent.press(getByText("Priminti slaptažodį"));

    await waitFor(() => {
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(
        firebase.auth,
        "test@example.com"
      );
      expect(Alert.alert).toHaveBeenCalledWith(
        "Slaptažodžio priminimo nuoroda nusiųsta",
        "Jeigu turite paskyrą, slaptažodžio priminimo nuoroda išsiųsta į el. paštą"
      );
      expect(mockNavigate).toHaveBeenCalledWith("Login");
    });
  });

  it("handles invalid-email error", async () => {
    sendPasswordResetEmail.mockRejectedValueOnce({ code: "auth/invalid-email" });
    const { getByText, getByPlaceholderText } = render(<ForgotPassword />);

    fireEvent.changeText(
      getByPlaceholderText("pavyzdys@gmail.com"),
      "bad-email"
    );
    fireEvent.press(getByText("Priminti slaptažodį"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Invalid Email",
        "Please enter a valid email address."
      );
    });
  });

  it("handles user-not-found error", async () => {
    sendPasswordResetEmail.mockRejectedValueOnce({ code: "auth/user-not-found" });
    const { getByText, getByPlaceholderText } = render(<ForgotPassword />);

    fireEvent.changeText(
      getByPlaceholderText("pavyzdys@gmail.com"),
      "notfound@example.com"
    );
    fireEvent.press(getByText("Priminti slaptažodį"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Email Not Found",
        "This email address is not associated with any account."
      );
    });
  });

  it("handles generic errors", async () => {
    sendPasswordResetEmail.mockRejectedValueOnce({
      code: "auth/other",
      message: "Some unexpected error"
    });
    const { getByText, getByPlaceholderText } = render(<ForgotPassword />);

    fireEvent.changeText(
      getByPlaceholderText("pavyzdys@gmail.com"),
      "other@example.com"
    );
    fireEvent.press(getByText("Priminti slaptažodį"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Password Reset Failed",
        "Some unexpected error"
      );
    });
  });
});
