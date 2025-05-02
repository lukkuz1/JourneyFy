// __tests__/SeatSelectionSheet.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SeatSelectionSheet from "../../../src/components/OfferRide/SeatSelectionSheet";

jest.mock("@rneui/themed", () => ({
  BottomSheet: ({ children }) => children,
}));

describe("SeatSelectionSheet", () => {
  const seats = [1, 2, 3];
  const onSelect = jest.fn();
  const onClose = jest.fn();

  it("renders header and seats, and responds to selection", () => {
    const { getByText } = render(
      <SeatSelectionSheet
        isVisible
        seats={seats}
        selectedSeat={2}
        onSelect={onSelect}
        onClose={onClose}
      />
    );

    expect(getByText("Vietų sk.")).toBeTruthy();
    seats.forEach((n) => {
      const txt = getByText(String(n));
      fireEvent.press(txt);
      expect(onSelect).toHaveBeenCalledWith(n);
      expect(onClose).toHaveBeenCalled();
    });
  });
});
