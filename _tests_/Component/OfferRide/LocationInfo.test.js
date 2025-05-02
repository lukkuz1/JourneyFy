// __tests__/LocationInfo.test.js
import React from "react";
import { render } from "@testing-library/react-native";
import LocationInfo from "../../../src/components/OfferRide/LocationInfo";
import "react-native-dashed-line";

jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");

describe("LocationInfo", () => {
  it("shows fallback texts when no addresses", () => {
    const { getByText } = render(<LocationInfo />);
    expect(getByText("-- Nenurodyta paėmimo vieta --")).toBeTruthy();
    expect(getByText("-- Nenurodytas kelionės tikslas --")).toBeTruthy();
  });

  it("displays provided addresses", () => {
    const { getByText } = render(
      <LocationInfo pickupAddress="P1" destinationAddress="D1" />
    );
    expect(getByText("P1")).toBeTruthy();
    expect(getByText("D1")).toBeTruthy();
  });
});
