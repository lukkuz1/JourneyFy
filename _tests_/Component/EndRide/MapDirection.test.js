// __tests__/MapDirection.test.js
import React from "react";
import { render } from "@testing-library/react-native";
import MapDirection from "../../../src/components/EndRide/MapDirection";

// stub MapView and related components
jest.mock("react-native-maps", () => {
  const React = require("react");
  const View = require("react-native").View;
  return {
    __esModule: true,
    default: ({ children }) => <View testID="map">{children}</View>,
    Marker: (props) => <View testID="marker" {...props} />,
    PROVIDER_GOOGLE: "google",
  };
});
jest.mock("react-native-maps-directions", () => (props) => {
  // call onReady immediately with fake coords
  React = require("react");
  React.useEffect(() => {
    props.onReady({ coordinates: [{ latitude: 1, longitude: 2 }, { latitude: 3, longitude: 4 }] });
  }, []);
  return <View testID="directions" />;
});
import { View } from "react-native";

describe("MapDirection", () => {
  it("renders null when no ride prop", () => {
    const { queryByTestId } = render(<MapDirection ride={null} />);
    expect(queryByTestId("map")).toBeNull();
  });

  it("renders map, directions, and markers when ride provided", async () => {
    const ride = { pickupAddress: "A", destinationAddress: "B" };
    const { getByTestId, queryAllByTestId } = render(
      <MapDirection ride={ride} />
    );
    expect(getByTestId("map")).toBeTruthy();
    expect(getByTestId("directions")).toBeTruthy();
    const markers = queryAllByTestId("marker");
    // two markers: start and end
    expect(markers.length).toBe(2);
  });
});
