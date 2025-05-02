import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import RideMapViewScreen from "../../../src/screens/TemplateJourney/rideMapView/rideMapViewScreen";

jest.mock("../../../components/myStatusBar", () => () => <Text testID="status-bar" />);
jest.mock("../../../components/header", () => ({ title }) => <Text testID="header">{title}</Text>);
jest.mock("../../../components/RideMapView/DirectionMap", () => () => (
  <Text testID="direction-map" />
));
jest.mock("../../../components/RideMapView/RideInfoSheet", () => () => (
  <Text testID="info-sheet" />
));

describe("RideMapViewScreen", () => {
  const navigation = { navigate: jest.fn() };

  it("renders status bar, header, DirectionMap, and RideInfoSheet", () => {
    const { getByTestId } = render(
      <RideMapViewScreen navigation={navigation} />
    );
    expect(getByTestId("status-bar")).toBeTruthy();
    expect(getByTestId("header").props.children).toBe("Žemėlapio peržiūra");
    expect(getByTestId("direction-map")).toBeTruthy();
    expect(getByTestId("info-sheet")).toBeTruthy();
  });
});
