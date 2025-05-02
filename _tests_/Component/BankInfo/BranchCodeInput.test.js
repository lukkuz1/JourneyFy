// __tests__/BranchCodeInput.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import BranchCodeInput from "../../../src/components/BankInfo/BranchCodeInput";

describe("BranchCodeInput", () => {
  it("renders label, placeholder, and calls onChangeText", () => {
    const onChangeText = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <BranchCodeInput value="001" onChangeText={onChangeText} />
    );
    // Label
    expect(getByText("Filialo kodas")).toBeTruthy();
    // Placeholder
    const input = getByPlaceholderText("Įveskite filialo kodą");
    expect(input.props.value).toBe("001");
    // Simulate change
    fireEvent.changeText(input, "123");
    expect(onChangeText).toHaveBeenCalledWith("123");
  });
});
