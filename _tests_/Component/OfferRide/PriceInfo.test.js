// __tests__/PriceInfo.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PriceInfo from "../../../src/components/OfferRide/PriceInfo";

describe("PriceInfo", () => {
  it("renders label and responds to price change", () => {
    const onPriceChange = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <PriceInfo price="" onPriceChange={onPriceChange} />
    );
    expect(getByText("Kaina")).toBeTruthy();
    const input = getByPlaceholderText("Įveskite savo kainą už vietą");
    fireEvent.changeText(input, "12.5");
    expect(onPriceChange).toHaveBeenCalledWith("12.5");
  });
});
