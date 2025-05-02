// __tests__/ContinueButton.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ContinueButton from "../../../src/components/OfferRide/ContinueButton";

describe("ContinueButton", () => {
  it("renders and responds to press", () => {
    const onPress = jest.fn();
    const { getByText } = render(<ContinueButton onPress={onPress} />);

    const btn = getByText("Tęsti");
    expect(btn).toBeTruthy();

    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalled();
  });
});
