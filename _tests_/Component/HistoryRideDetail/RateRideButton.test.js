// __tests__/RateRideButton.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import RateRideButton from "../../../src/components/HistoryRideDetail/RateRideButton";

describe("RateRideButton", () => {
  it("renders the button and calls onPress", () => {
    const onPress = jest.fn();
    const { getByText } = render(<RateRideButton onPress={onPress} />);
    const btn = getByText("Įvertinti vairuotoją");
    expect(btn).toBeTruthy();
    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalled();
  });
});
