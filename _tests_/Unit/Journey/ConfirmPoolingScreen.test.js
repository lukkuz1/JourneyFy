// __tests__/ConfirmPoolingScreen.test.js
import React from "react";
import { Text, Image, Platform, BackHandler } from "react-native";
import { render, fireEvent, act } from "@testing-library/react-native";
import ConfirmPoolingScreen from "../../../src/screens/TemplateJourney/confirmPooling/confirmPoolingScreen";
import * as RNNavigation from "@react-navigation/native";

// --- Mocks ---

// Stub out MyStatusBar so it doesn't error
jest.mock("../../../components/myStatusBar", () => () => <Text testID="status-bar" />);

// Make useFocusEffect run its effect immediately
jest.spyOn(RNNavigation, "useFocusEffect").mockImplementation(cb => cb());

// Spy on BackHandler
jest.spyOn(BackHandler, "addEventListener");
jest.spyOn(BackHandler, "removeEventListener");

describe("ConfirmPoolingScreen", () => {
  let navigation;

  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("renders congratulations text and image, and back-to-home link", () => {
    const { getByText, getByTestId, UNSAFE_getByType } = render(
      <ConfirmPoolingScreen navigation={navigation} />
    );

    // Status bar present
    expect(getByTestId("status-bar")).toBeTruthy();

    // Congrats header
    expect(getByText("Sveikiname")).toBeTruthy();

    // Body text
    expect(
      getByText("Jūsų kelionės pasiūlymas yra\npatvirtintas")
    ).toBeTruthy();

    // Image is rendered
    expect(UNSAFE_getByType(Image)).toBeTruthy();

    // Back-to-home link
    const backLink = getByText("Atgal į Pradžią");
    expect(backLink).toBeTruthy();

    // Pressing it navigates home
    fireEvent.press(backLink);
    expect(navigation.navigate).toHaveBeenCalledWith("HomeScreen");
  });

  describe("hardware back handling on Android", () => {
    let backHandlerCallback;

    beforeAll(() => {
      // Force Platform.OS to 'android'
      jest.spyOn(Platform, "OS", "get").mockReturnValue("android");
    });

    it("registers BackHandler and navigates Home on back press", () => {
      render(<ConfirmPoolingScreen navigation={navigation} />);

      // Should have registered hardwareBackPress listener
      expect(BackHandler.addEventListener).toHaveBeenCalledWith(
        "hardwareBackPress",
        expect.any(Function)
      );

      // Grab the registered callback
      backHandlerCallback = BackHandler.addEventListener.mock.calls[0][1];

      // Simulate back press
      const handled = backHandlerCallback();

      // On Android branch, callback should return true and navigate
      expect(handled).toBe(true);
      expect(navigation.navigate).toHaveBeenCalledWith("HomeScreen");
    });

    it("cleans up BackHandler on unmount", () => {
      const { unmount } = render(<ConfirmPoolingScreen navigation={navigation} />);
      unmount();
      expect(BackHandler.removeEventListener).toHaveBeenCalledWith(
        "hardwareBackPress",
        expect.any(Function)
      );
    });
  });

  describe("backAction on iOS", () => {
    beforeAll(() => {
      jest.spyOn(Platform, "OS", "get").mockReturnValue("ios");
    });

    it("registers beforeRemove listener instead of navigating immediately", () => {
      render(<ConfirmPoolingScreen navigation={navigation} />);

      // For iOS, backAction calls navigation.addListener('beforeRemove', ...)
      // That happens inside backAction, which is registered both for hardwareBackPress and gestureEnd
      // Grab the gestureEnd listener registration
      expect(navigation.addListener).toHaveBeenCalledWith(
        "gestureEnd",
        expect.any(Function)
      );

      // Also hardwareBackPress should register, but callback will hit iOS branch
      expect(BackHandler.addEventListener).toHaveBeenCalledWith(
        "hardwareBackPress",
        expect.any(Function)
      );

      // Grab the gestureEnd callback
      const gestureCallback = navigation.addListener.mock.calls.find(
        call => call[0] === "gestureEnd"
      )[1];

      // Simulate calling it: it should try to add 'beforeRemove' listener
      gestureCallback();
      expect(navigation.addListener).toHaveBeenCalledWith(
        "beforeRemove",
        expect.any(Function)
      );
    });
  });
});
