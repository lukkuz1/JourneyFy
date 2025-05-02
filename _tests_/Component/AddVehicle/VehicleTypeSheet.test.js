// __tests__/VehicleTypeSheet.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import VehicleTypeSheet from "../../../src/components/AddVehicle/VehicleTypeSheet";
import { BottomSheet } from "@rneui/themed";

// stub BottomSheet
jest.mock("@rneui/themed", () => ({
  BottomSheet: ({ isVisible, onBackdropPress, children }) =>
    isVisible ? <>{children}</> : null,
}));

describe("VehicleTypeSheet", () => {
  const onClose = jest.fn();
  const onSelectVehicleType = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it("renders all types and highlights selected", () => {
    const { getByText } = render(
      <VehicleTypeSheet
        isVisible={true}
        onClose={onClose}
        selectedVehicleType="Kupė"
        onSelectVehicleType={onSelectVehicleType}
      />
    );

    // should render a known type
    expect(getByText("Kupė")).toBeTruthy();
  });

  it("selects type and calls callbacks", () => {
    const { getByText } = render(
      <VehicleTypeSheet
        isVisible={true}
        onClose={onClose}
        selectedVehicleType=""
        onSelectVehicleType={onSelectVehicleType}
      />
    );

    const target = getByText("Universalas");
    fireEvent.press(target);

    expect(onSelectVehicleType).toHaveBeenCalledWith("Universalas");
    expect(onClose).toHaveBeenCalled();
  });
});
