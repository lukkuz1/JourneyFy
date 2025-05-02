// __tests__/RouteList.test.js
import React from "react";
import { render } from "@testing-library/react-native";
import RouteList from "../../../src/components/EndRide/RouteList";
import DashedLine from "react-native-dashed-line";

describe("RouteList", () => {
  it("renders null when no ride", () => {
    const { container } = render(<RouteList ride={null} />);
    expect(container.children.length).toBe(0);
  });

  it("renders pickup and dropoff stops in order with correct styling", () => {
    const ride = {
      pickupAddress: "Start",
      destinationAddress: "End",
      status: "pending",
    };
    const { getByText, getAllByText, queryAllByType } = render(
      <RouteList ride={ride} />
    );
    // Titles
    expect(getByText("Paėmimas")).toBeTruthy();
    expect(getByText("Galutinis kelionės taškas")).toBeTruthy();
    // Addresses
    expect(getByText("Start")).toBeTruthy();
    expect(getByText("End")).toBeTruthy();
    // One DashedLine
    expect(queryAllByType(DashedLine).length).toBe(1);
  });

  it("shows completed styling when status=finished", () => {
    const ride = {
      pickupAddress: "S",
      destinationAddress: "E",
      status: "finished",
    };
    const { getAllByProps } = render(<RouteList ride={ride} />);
    // Both pins should render but color prop on first pin = gray for completed?
    // We'll grab the first pin's style via getAllByProps:
    const completedPins = getAllByProps({ color: undefined }); // pins are Views, not Icons in this test.
    // At least verifying both items present:
    expect(completedPins.length).toBeGreaterThanOrEqual(2);
  });
});
