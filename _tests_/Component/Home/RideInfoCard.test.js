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
  it("renders tabs, locations, date/time, seat, submit and alert", () => {
    const { getByText } = render(<RideInfoCard {...baseProps} />);
    // Tabs
    expect(getByText("Rasti kelionę")).toBeTruthy();
    expect(getByText("Pasiūlykite kelionę")).toBeTruthy();
    // Locations
    expect(getByText("Paėmimo vieta")).toBeTruthy();
    expect(getByText("P1")).toBeTruthy();
    expect(getByText("Paskirties vieta")).toBeTruthy();
    expect(getByText("D1")).toBeTruthy();
    // Date/time & seat
    expect(getByText("2025-05-04 09:00")).toBeTruthy();
    expect(getByText("2 Vieta")).toBeTruthy();
    // Submit
    expect(getByText("Rasti kelionę")).toBeTruthy();
    // Alert text
    expect(getByText("Prašome pasirinkti tinkamas vietas")).toBeTruthy();
  });

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

  it("calls onDateTimePress, onSeatPress and onSubmit appropriately", () => {
    const { getByText } = render(<RideInfoCard {...baseProps} />);
    fireEvent.press(getByText("2025-05-04 09:00"));
    expect(baseProps.onDateTimePress).toHaveBeenCalled();
    fireEvent.press(getByText("2 Vieta"));
    expect(baseProps.onSeatPress).toHaveBeenCalled();
    fireEvent.press(getByText("Rasti kelionę"));
    expect(baseProps.onSubmit).toHaveBeenCalled();
  });
});
