// __tests__/LocationSearchHeader.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LocationSearchHeader from "../../../src/components/PickLocation/LocationSearchHeader";
import { Platform } from "react-native";

// mock the GooglePlacesAutocomplete component
jest.mock("react-native-google-places-autocomplete", () => ({
  GooglePlacesAutocomplete: ({ textInputProps, onPress, onFail, onNotFound }) => {
    return (
      <></> // we won't test the autocomplete itself here
    );
  },
}));
jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");
jest.mock("react-native-vector-icons/Ionicons", () => "Icon");

describe("LocationSearchHeader", () => {
  const onBack = jest.fn();
  let setSearch;
  beforeEach(() => {
    setSearch = jest.fn();
  });

  it("calls onBackPress when back arrow is pressed", () => {
    const { getByTestId } = render(
      <LocationSearchHeader
        search=""
        setSearch={setSearch}
        onLocationSelected={() => {}}
        onBackPress={onBack}
      />
    );
    // The back icon is a MaterialIcons, underlying is <MaterialIcons ... onPress={onBack} />
    // Testing-library can't find by icon name, so use getByProps
    const back = getByTestId("arrow-back-ios");
    fireEvent.press(back);
    expect(onBack).toHaveBeenCalled();
  });

  it("clears search when clear icon pressed on Android", () => {
    Platform.OS = "android";
    const { UNSAFE_getByType } = render(
      <LocationSearchHeader
        search="foo"
        setSearch={setSearch}
        onLocationSelected={() => {}}
        onBackPress={() => {}}
      />
    );
    // the clear icon is a MaterialIcons with name="close"
    // using getByProps to find it
    const clearIcon = UNSAFE_getByType("Icon").find(
      node => node.props.name === "close"
    );
    fireEvent.press(clearIcon);
    expect(setSearch).toHaveBeenCalledWith("");
  });
});
