import React from "react";
import { Text, KeyboardAvoidingView, Platform } from "react-native";
import { render, act, fireEvent } from "@testing-library/react-native";
import PickLocationScreen from "../../../src/screens/TemplateJourney/pickLocation/pickLocationScreen";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";

jest.mock("../../../components/myStatusBar", () => () => <Text testID="status-bar" />);
jest.mock("../../../components/PickLocation/LocationSearchHeader", () => (props) => (
  <Text
    testID="search-header"
    onPress={() => props.onLocationSelected({ lat: 10, lng: 20 })}
  />
));
jest.mock("../../../components/PickLocation/PickLocationMap", () => (props) => (
  <Text
    testID="map"
    onPress={() => props.onMarkerDragEnd({ latitude: 11, longitude: 21 })}
  />
));
jest.mock("../../../components/PickLocation/LocationFooter", () => (props) => (
  <Text testID="footer" onPress={props.onPickLocation}>
    {props.address || "no-address"}
  </Text>
));

describe("PickLocationScreen", () => {
  let navigation;
  const route = { params: { addressFor: "start" } };

  beforeEach(() => {
    navigation = { navigate: jest.fn(), goBack: jest.fn() };
    jest.clearAllMocks();

    // stub location permission + geolocation
    Location.requestForegroundPermissionsAsync = jest
      .fn()
      .mockResolvedValue({ status: "granted" });
    Location.getCurrentPositionAsync = jest
      .fn()
      .mockResolvedValue({ coords: { latitude: 54.9, longitude: 23.9 } });

    // stub geocoder
    Geocoder.init = jest.fn();
    Geocoder.from = jest.fn().mockResolvedValue({
      results: [{ formatted_address: "Test Addr" }],
    });
  });

  const flush = () => new Promise(setImmediate);

  it("renders and fetches device location + address", async () => {
    const { getByTestId } = render(
      <PickLocationScreen navigation={navigation} route={route} />
    );
    // status bar
    expect(getByTestId("status-bar")).toBeTruthy();

    // wait for useEffect chains
    await act(flush);

    // Map and footer now show geocoded address
    expect(getByTestId("map")).toBeTruthy();
    expect(getByTestId("footer").children).toContain("Test Addr");
  });

  it("updates marker & address when user searches", async () => {
    const { getByTestId } = render(
      <PickLocationScreen navigation={navigation} route={route} />
    );
    await act(flush);

    // simulate user picks a search result
    fireEvent.press(getByTestId("search-header"));
    // wait for setState + geocode
    await act(flush);

    expect(Geocoder.from).toHaveBeenCalledWith(10, 20);
    expect(getByTestId("footer").children).toContain("Test Addr");
  });

  it("updates marker & address when user drags marker", async () => {
    const { getByTestId } = render(
      <PickLocationScreen navigation={navigation} route={route} />
    );
    await act(flush);

    // simulate drag end
    fireEvent.press(getByTestId("map"));
    await act(flush);

    expect(Geocoder.from).toHaveBeenCalledWith(11, 21);
  });

  it("navigates back with selected address on confirm", async () => {
    const { getByTestId } = render(
      <PickLocationScreen navigation={navigation} route={route} />
    );
    await act(flush);

    // footer press calls onPickLocation
    fireEvent.press(getByTestId("footer"));
    expect(navigation.navigate).toHaveBeenCalledWith("HomeScreen", {
      address: "Test Addr",
      addressFor: "start",
    });
  });

  describe("KeyboardAvoidingView behavior", () => {
    afterEach(() => jest.restoreAllMocks());

    it("uses padding on iOS", () => {
      jest.spyOn(Platform, "OS", "get").mockReturnValue("ios");
      const { UNSAFE_getByType } = render(
        <PickLocationScreen navigation={navigation} route={route} />
      );
      const kv = UNSAFE_getByType(KeyboardAvoidingView);
      expect(kv.props.behavior).toBe("padding");
    });

    it("uses undefined on Android", () => {
      jest.spyOn(Platform, "OS", "get").mockReturnValue("android");
      const { UNSAFE_getByType } = render(
        <PickLocationScreen navigation={navigation} route={route} />
      );
      const kv = UNSAFE_getByType(KeyboardAvoidingView);
      expect(kv.props.behavior).toBeUndefined();
    });
  });
});
