import React from "react";
import { Text, Image, Platform, BackHandler } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import RideCompleteScreen from "../../../src/screens/TemplateJourney/rideComplete/rideCompleteScreen";
import { useFocusEffect } from "@react-navigation/native";

jest.mock("../../../components/myStatusBar", () => () => <Text testID="status-bar" />);
jest.mock("@react-navigation/native", () => ({ useFocusEffect: jest.fn() }));

describe("RideCompleteScreen", () => {
  let navigation;

  beforeEach(() => {
    navigation = { navigate: jest.fn(), addListener: jest.fn(), removeListener: jest.fn() };
    jest.clearAllMocks();
    useFocusEffect.mockImplementation((cb) => cb());
    jest.spyOn(BackHandler, "addEventListener");
    jest.spyOn(BackHandler, "removeEventListener");
  });

  it("renders success info and back link", () => {
    const { getByText, getByTestId, UNSAFE_getByType } = render(
      <RideCompleteScreen navigation={navigation} />
    );

    expect(getByTestId("status-bar")).toBeTruthy();
    expect(getByText("Kelionė užbaigta")).toBeTruthy();
    expect(UNSAFE_getByType(Image)).toBeTruthy();

    const back = getByText("Atgal į pradžią");
    fireEvent.press(back);
    expect(navigation.navigate).toHaveBeenCalledWith("Journey");
  });

  describe("Android back handler", () => {
    let handler;
    beforeAll(() => jest.spyOn(Platform, "OS", "get").mockReturnValue("android"));

    it("registers and navigates on back press", () => {
      render(<RideCompleteScreen navigation={navigation} />);
      expect(BackHandler.addEventListener).toHaveBeenCalledWith(
        "hardwareBackPress",
        expect.any(Function)
      );
      handler = BackHandler.addEventListener.mock.calls[0][1];
      const handled = handler();
      expect(handled).toBe(true);
      expect(navigation.navigate).toHaveBeenCalledWith("Journey");
    });

    it("cleans up on unmount", () => {
      const { unmount } = render(<RideCompleteScreen navigation={navigation} />);
      unmount();
      expect(BackHandler.removeEventListener).toHaveBeenCalledWith(
        "hardwareBackPress",
        expect.any(Function)
      );
      expect(navigation.removeListener).toHaveBeenCalledWith(
        "gestureEnd",
        expect.any(Function)
      );
    });
  });
});
