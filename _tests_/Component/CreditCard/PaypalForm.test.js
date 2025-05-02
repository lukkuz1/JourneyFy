// __tests__/PaypalForm.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PaypalForm from "../../../src/components/CreditCard/PaypalForm";

describe("PaypalForm", () => {
  it("renders label and calls onChange with email & password", () => {
    const onChange = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <PaypalForm onChange={onChange} />
    );

    // Label present
    expect(getByText("PayPal el. paštas")).toBeTruthy();

    // Enter email
    const input = getByPlaceholderText("Įveskite savo Paypal el. paštą");
    fireEvent.changeText(input, "user@example.com");

    // onChange should be called with { email, password }
    expect(onChange).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "",
    });
  });
});
