// __tests__/ProfileOption.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProfileOption from "../../../src/components/Profile/ProfileOption";

describe("<ProfileOption />", () => {
  it("renders icon, option, detail and handles press", () => {
    const onPress = jest.fn();
    const { getByText, getByTestId } = render(
      <ProfileOption
        icon="car"
        option="Opt"
        detail="Det"
        onPress={onPress}
      />
    );
    expect(getByText("Opt")).toBeTruthy();
    expect(getByText("Det")).toBeTruthy();
    // TouchableOpacity has no testID, so use getByText on option to press
    fireEvent.press(getByText("Opt"));
    expect(onPress).toHaveBeenCalled();
  });
});
