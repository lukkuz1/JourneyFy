// __tests__/CarSelectionSheet.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CarSelectionSheet from "../../../src/components/OfferRide/CarSelectionSheet";

jest.mock("@rneui/themed", () => ({
  BottomSheet: ({ children }) => children,
}));
jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");

describe("CarSelectionSheet", () => {
  const carsList = ["A", "B", "C"];
  const onSelect = jest.fn();
  const onClose = jest.fn();

  it("renders header and list, and calls onSelect when item pressed", () => {
    const { getByText } = render(
      <CarSelectionSheet
        isVisible={true}
        carsList={carsList}
        onSelect={onSelect}
        onClose={onClose}
      />
    );

    // Header
    expect(getByText("Pasirinkite savo automobilį")).toBeTruthy();

    // Each car option
    carsList.forEach((car) => {
      const txt = getByText(car);
      expect(txt).toBeTruthy();
      fireEvent.press(txt);
      expect(onSelect).toHaveBeenCalledWith(car);
    });
  });
});
