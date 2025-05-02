// __tests__/UpdateButton.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import UpdateButton from "../../../src/components/Profile/UpdateButton";

describe("<UpdateButton />", () => {
  it("renders 'Atnaujinti' and calls onPress", () => {
    const onPress = jest.fn();
    const { getByText } = render(<UpdateButton onPress={onPress} />);
    const btn = getByText("Atnaujinti");
    expect(btn).toBeTruthy();
    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalled();
  });
});
