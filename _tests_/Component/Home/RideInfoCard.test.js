// __tests__/RideInfoCard.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import RideInfoCard from "../../../src/components/Home/RideInfoCard";
import { Text } from "react-native";

const baseProps = {
  selectedTabIndex: 1,
  setselectedTabIndex: jest.fn(),
  navigation: { navigate: jest.fn() },
  pickupAddress: "P1",
  destinationAddress: "D1",
  selectedDateAndTime: "2025-05-04 09:00",
  selectedSeat: 2,
  onDateTimePress: jest.fn(),
  onSeatPress: jest.fn(),
  onSubmit: jest.fn(),
  pickAlert: true,
};

describe("RideInfoCard", () => {


  it("switches tabs when pressed", () => {
    const { getByText } = render(<RideInfoCard {...baseProps} />);
    fireEvent.press(getByText("Pasiūlykite kelionę"));
    expect(baseProps.setselectedTabIndex).toHaveBeenCalledWith(2);
  });

  it("navigates to PickLocationScreen for pickup and destination", () => {
    const { getAllByText } = render(<RideInfoCard {...baseProps} />);
    fireEvent.press(getAllByText("Paėmimo vieta")[0]);
    expect(baseProps.navigation.navigate).toHaveBeenCalledWith("PickLocationScreen", { addressFor: "pickup" });
    fireEvent.press(getAllByText("Paskirties vieta")[0]);
    expect(baseProps.navigation.navigate).toHaveBeenCalledWith("PickLocationScreen", { addressFor: "destination" });
  });

});
