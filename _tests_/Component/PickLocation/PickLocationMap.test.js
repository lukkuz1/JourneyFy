// __tests__/PickLocationMap.test.js
import React from "react";
import { render } from "@testing-library/react-native";
import PickLocationMap from "../../../src/components/PickLocation/PickLocationMap";

// mock react-native-maps
jest.mock("react-native-maps", () => {
  const React = require("react");
  class MockMapView extends React.Component {
    render() {
      return React.createElement("MapView", this.props, this.props.children);
    }
  }
  class MockMarker extends React.Component {
    render() {
      return React.createElement("Marker", this.props, this.props.children);
    }
  }
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
    PROVIDER_GOOGLE: "google",
  };
});

describe("PickLocationMap", () => {
  it("renders MapView with correct initialRegion and Marker", () => {
    const coord = { latitude: 10, longitude: 20 };
    const onDrag = jest.fn();
    const { getByType } = render(
      <PickLocationMap currentMarker={coord} onMarkerDragEnd={onDrag} />
    );
    const map = getByType("MapView");
    expect(map.props.initialRegion).toMatchObject({
      latitude: 10,
      longitude: 20,
    });

    // find the Marker and simulate drag end
    const marker = getByType("Marker");
    expect(marker.props.coordinate).toEqual(coord);

    const newCoord = { latitude: 30, longitude: 40 };
    marker.props.onDragEnd({ nativeEvent: { coordinate: newCoord } });
    expect(onDrag).toHaveBeenCalledWith(newCoord);
  });
});
