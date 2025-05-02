// __tests__/SeatInfo.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SeatInfo from "../../../src/components/OfferRide/SeatInfo";

jest.mock("react-native-vector-icons/Ionicons", () => "Icon");

describe("SeatInfo", () => {
  const onPress = jest.fn();

  it("shows placeholder when no seat selected and calls onPress", () => {
    const { getByText } = render(<SeatInfo selectedSeat={null} onPress={onPress} />);
    const placeholder = getByText("Pasirinkite laisvų vietų sk.");
    fireEvent.press(placeholder);
    expect(onPress).toHaveBeenCalled();
  });

  it("shows selected seat when provided", () => {
    const { getByText } = render(<SeatInfo selectedSeat={3} onPress={onPress} />);
    expect(getByText("3")).toBeTruthy();
  });
});
