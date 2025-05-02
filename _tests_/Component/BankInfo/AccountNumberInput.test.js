// __tests__/AccountNumberInput.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AccountNumberInput from "../../../src/components/BankInfo/AccountNumberInput";

describe("AccountNumberInput", () => {
  it("renders label, placeholder, and calls onChangeText", () => {
    const onChangeText = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <AccountNumberInput value="123" onChangeText={onChangeText} />
    );
    // Label
    expect(getByText("Sąskaitos numeris")).toBeTruthy();
    // Placeholder
    const input = getByPlaceholderText("Enter account number");
    expect(input.props.keyboardType).toBe("numeric");
    // Simulate change
    fireEvent.changeText(input, "456789");
    expect(onChangeText).toHaveBeenCalledWith("456789");
  });
});
