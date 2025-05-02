// __tests__/EntryInputField.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import EntryInputField from "../../../src/components/Entry/EntryInputField";
import { TextInput, Text } from "react-native";

// stub icon
jest.mock('@expo/vector-icons', () => ({
  MaterialCommunityIcons: ({ name, size, color }) => <Text testID={`icon-${name}`} />
}));

describe("EntryInputField", () => {
  it("renders header, placeholder, and postfix when not password", () => {
    const onChangeText = jest.fn();
    const { getByText, getByPlaceholderText, queryByTestId } = render(
      <EntryInputField
        headerText="Username"
        placeholderText="Enter username"
        isPassword={false}
        postfix="USD"
        onChangeText={onChangeText}
        keyboardType="default"
        margin={[1,2,3,4]}
      />
    );

    // Header
    expect(getByText("Username")).toBeTruthy();
    // Input placeholder
    const input = getByPlaceholderText("Enter username");
    expect(input.props.secureTextEntry).toBe(false);
    // Postfix
    expect(getByText(" USD")).toBeTruthy();
    // No eye icon
    expect(queryByTestId("icon-eye-off-outline")).toBeNull();

    // Typing text calls onChangeText
    fireEvent.changeText(input, "foo");
    expect(onChangeText).toHaveBeenCalledWith("foo");
  });

  it("toggles secureTextEntry when isPassword=true", () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <EntryInputField
        headerText="Password"
        placeholderText="Enter pw"
        isPassword={true}
        onChangeText={onChangeText}
        keyboardType="default"
      />
    );
    const input = getByPlaceholderText("Enter pw");
    // Initially secure
    expect(input.props.secureTextEntry).toBe(true);

    // Eye icon present
    const eyeOff = getByTestId("icon-eye-off-outline");
    // Toggle to visible
    fireEvent.press(eyeOff);
    // Re-fetch input to check updated prop
    const input2 = getByPlaceholderText("Enter pw");
    expect(input2.props.secureTextEntry).toBe(false);

    // Next toggle back
    const eyeOn = getByTestId("icon-eye-outline");
    fireEvent.press(eyeOn);
    const input3 = getByPlaceholderText("Enter pw");
    expect(input3.props.secureTextEntry).toBe(true);
  });
});
