// __tests__/BankNameInput.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import BankNameInput from "../../../src/components/BankInfo/BankNameInput";

describe("BankNameInput", () => {
  it("renders label, placeholder, and calls onChangeText", () => {
    const onChangeText = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <BankNameInput value="MyBank" onChangeText={onChangeText} />
    );
    // Label
    expect(getByText("Banko pavadinimas")).toBeTruthy();
    // Placeholder
    const input = getByPlaceholderText("Įveskite banko pavadinimą");
    expect(input.props.value).toBe("MyBank");
    // Simulate change
    fireEvent.changeText(input, "NewBank");
    expect(onChangeText).toHaveBeenCalledWith("NewBank");
  });
});
