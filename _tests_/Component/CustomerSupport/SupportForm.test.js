// __tests__/SupportForm.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SupportForm from "../../../src/components/CustomerSupport/SupportForm";

describe("SupportForm", () => {
  it("renders all three fields with correct placeholders and keyboardTypes", () => {
    const { getByPlaceholderText } = render(<SupportForm />);
    // Name field
    const nameInput = getByPlaceholderText("Įveskite savo vardą");
    expect(nameInput).toBeTruthy();
    // Email field
    const emailInput = getByPlaceholderText("Įveskite savo e. paštą");
    expect(emailInput.props.keyboardType).toBe("email-address");
    // Message field
    const msgInput = getByPlaceholderText("Įveskite savo žinutę");
    expect(msgInput.props.multiline).toBe(true);
  });

  it("allows typing into each field", () => {
    const { getByPlaceholderText } = render(<SupportForm />);
    const nameInput = getByPlaceholderText("Įveskite savo vardą");
    fireEvent.changeText(nameInput, "Jonas");
    expect(nameInput.props.value).toBe("Jonas"); // Note: TextInput without `value` prop won't reflect change; if you add value in component, test would capture it.

    const emailInput = getByPlaceholderText("Įveskite savo e. paštą");
    fireEvent.changeText(emailInput, "a@b.com");

    const msgInput = getByPlaceholderText("Įveskite savo žinutę");
    fireEvent.changeText(msgInput, "Sveiki!");
  });
});
