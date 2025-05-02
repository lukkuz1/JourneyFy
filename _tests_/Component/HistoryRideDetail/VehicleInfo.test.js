// __tests__/VehicleInfo.test.js
import React from "react";
import { render } from "@testing-library/react-native";
import VehicleInfo from "../../../src/components/HistoryRideDetail/VehicleInfo";
import { Text } from "react-native";

describe("VehicleInfo", () => {
  const ride = { car: "Tesla", facilities: "AC" };

  it("renders model and facilities labels and values", () => {
    const { getByText } = render(<VehicleInfo ride={ride} />);
    expect(getByText("Automobilio informacija")).toBeTruthy();
    expect(getByText("Modelis")).toBeTruthy();
    expect(getByText("Tesla")).toBeTruthy();
    expect(getByText("Įranga")).toBeTruthy();
    expect(getByText("AC")).toBeTruthy();
  });
});
