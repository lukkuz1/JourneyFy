// __tests__/SupportSubmitButton.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SubmitButton from "../../../src/components/CustomerSupport/SubmitButton";

describe("SubmitButton (Customer Support)", () => {
  it("renders and calls onPress when tapped", () => {
    const onPress = jest.fn();
    const { getByText } = render(<SubmitButton onPress={onPress} />);
    const btn = getByText("Pateikti");
    expect(btn).toBeTruthy();
    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalled();
  });
});
