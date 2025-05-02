// __tests__/RideInfoSheet.test.js
import React from "react";
import { render } from "@testing-library/react-native";
import RideInfoSheet from "../../../src/components/EndRide/RideInfoSheet";

// stub BottomSheet
jest.mock("react-native-simple-bottom-sheet", () => {
  return ({ children }) => <>{children( ()=>{} )}</>;
});
// stub Animatable
jest.mock("react-native-animatable", () => ({
  View: ({ children }) => <>{children}</>,
}));

// stub RouteList & PassengerList
jest.mock("../../../src/components/EndRide/PassengerList", () => () => <Text testID="pass-list"/>);
jest.mock("../../../src/components/EndRide/RouteList", () => () => <Text testID="route-list"/>);

import { Text } from "react-native";

describe("RideInfoSheet", () => {
  it("renders null when no ride passed", () => {
    const { container } = render(<RideInfoSheet ride={null} />);
    expect(container.children.length).toBe(0);
  });

  it("renders sheet with passenger & route lists", () => {
    const ride = { id: "r1" };
    const { getByText, getByTestId } = render(
      <RideInfoSheet ride={ride} passengersList={[{ id: "p1" }]} />
    );
    // Section headers
    expect(getByText("Keleiviai")).toBeTruthy();
    expect(getByText("Maršrutas")).toBeTruthy();
    // Child lists
    expect(getByTestId("pass-list")).toBeTruthy();
    expect(getByTestId("route-list")).toBeTruthy();
  });
});
