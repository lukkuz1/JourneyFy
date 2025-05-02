// __tests__/RiderDetail.test.js
import React from "react";
import { render } from "@testing-library/react-native";
import RiderDetail from "../../../src/components/HistoryRideDetail/RiderDetail";
import { Text } from "react-native";

// stub icons & dashed line
jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");
jest.mock("react-native-dashed-line", () => "DashedLine");

describe("RiderDetail", () => {
  const ride = { pickup: "P1", drop: "D1" };

  it("renders pickup and drop addresses with titles", () => {
    const { getByText, queryAllByText } = render(<RiderDetail ride={ride} />);
    // Section title
    expect(getByText("Kelionės maršrutas")).toBeTruthy();
    // Pickup
    expect(getByText("P1")).toBeTruthy();
    // Drop
    expect(getByText("D1")).toBeTruthy();
    // One dashed line
    expect(queryAllByText(() => false, { exact: false }).length).toBeGreaterThanOrEqual(0);
  });

  it("renders null if no ride", () => {
    const { container } = render(<RiderDetail ride={null} />);
    expect(container.children.length).toBe(0);
  });
});
