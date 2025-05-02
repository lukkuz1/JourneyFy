// __tests__/MapComponent.test.js
import React from "react";
import { render } from "@testing-library/react-native";
import MapComponent from "../../../src/components/Home/MapComponent";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

jest.mock("react-native-maps", () => {
  const React = require("react");
  const View = require("react-native").View;
  return {
    __esModule: true,
    default: (props) => <View testID="map" {...props} />,
    PROVIDER_GOOGLE: "google",
  };
});

describe("MapComponent", () => {
  it("renders MapView with correct region and provider", () => {
    const { getByTestId } = render(<MapComponent />);
    const map = getByTestId("map");
    expect(map.props.provider).toBe(PROVIDER_GOOGLE);
    expect(map.props.region).toMatchObject({
      latitude: 54.6872,
      longitude: 25.2797,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  });
});
