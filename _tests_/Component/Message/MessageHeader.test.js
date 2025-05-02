// __tests__/MessageHeader.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MessageHeader from "../../../src/components/Message/MessageHeader";
import { View, Text, Image, TouchableOpacity } from "react-native";

// Stub out MaterialIcons so we can catch onPress
jest.mock("react-native-vector-icons/MaterialIcons", () =>
  ({ name, color, size, onPress }) => (
    <TouchableOpacity onPress={onPress} testID="back-button">
      <Text>{name}</Text>
    </TouchableOpacity>
  )
);

describe("MessageHeader", () => {
  const navigation = { pop: jest.fn() };
  const driver = {
    firstName: "Jane",
    lastName: "Doe",
    photoURL: "http://photo",
  };
  const ride = { journeyDateTime: "2025-05-04 11:00" };

  it("renders driver name, subtitle and photo, and handles back press", () => {
    const { getByText, getByTestId, getByType } = render(
      <MessageHeader navigation={navigation} driver={driver} ride={ride} />
    );

    // Name
    expect(getByText("Jane Doe")).toBeTruthy();
    // Subtitle
    expect(getByText("Ride on 2025-05-04 11:00")).toBeTruthy();
    // Photo
    const img = getByType(Image);
    expect(img.props.source).toEqual({ uri: "http://photo" });
    // Back button
    fireEvent.press(getByTestId("back-button"));
    expect(navigation.pop).toHaveBeenCalled();
  });

  it("falls back to default when no driver or date", () => {
    const { getByText, queryByText, getByType } = render(
      <MessageHeader navigation={navigation} driver={null} ride={{}} />
    );
    // Default name
    expect(getByText("Driver")).toBeTruthy();
    // No subtitle
    expect(queryByText(/^Ride on/)).toBeNull();
    // Fallback image
    const img = getByType(Image);
    expect(img.props.source).toEqual(
      require("../../../src/assets/images/user/user2.png")
    );
  });
});
