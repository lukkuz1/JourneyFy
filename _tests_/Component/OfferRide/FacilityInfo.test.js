// __tests__/FacilityInfo.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FacilityInfo from "../../../src/components/OfferRide/FacilityInfo";

describe("FacilityInfo", () => {
  it("renders label and calls callback on text change", () => {
    const onFacilitiesChange = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <FacilityInfo facilities="" onFacilitiesChange={onFacilitiesChange} />
    );

    expect(getByText("Įranga (pvz: muzika, šildymas)")).toBeTruthy();
    const input = getByPlaceholderText("Įveskite įrangą");
    fireEvent.changeText(input, "AC");
    expect(onFacilitiesChange).toHaveBeenCalledWith("AC");
  });
});
