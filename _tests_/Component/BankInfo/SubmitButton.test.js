// __tests__/SubmitButton.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SubmitButton from "../../../src/components/BankInfo/SubmitButton";

describe("SubmitButton", () => {
  it("renders button text and calls onPress", () => {
    const onPress = jest.fn();
    const { getByText } = render(<SubmitButton onPress={onPress} />);
    const btn = getByText("Send to bank (100.00)");
    expect(btn).toBeTruthy();
    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalled();
  });
});
