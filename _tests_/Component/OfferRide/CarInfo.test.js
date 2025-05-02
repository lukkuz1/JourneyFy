// __tests__/CarInfo.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CarInfo from "../../../src/components/OfferRide/CarInfo";
import { Alert } from "react-native";

jest.mock("react-native-vector-icons/Ionicons", () => "Icon");
jest.mock("../../../src/hooks/useFetchVehicles");
import { useFetchVehicles } from "../../../src/hooks/useFetchVehicles";

jest.spyOn(Alert, "alert").mockImplementation(() => {});

describe("CarInfo", () => {
  const onPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows 'Pridėti automobilį' and alerts when no car", () => {
    useFetchVehicles.mockReturnValue({ vehicles: [], loading: false, error: null });
    const { getByText } = render(<CarInfo selectedCar="" onPress={onPress} />);

    const button = getByText("Pridėti automobilį");
    fireEvent.press(button);

    expect(Alert.alert).toHaveBeenCalledWith(
      "Pridėti automobilį",
      "Prašome pridėti savo automobilį, kad galėtumėte pasiūlyti kelionę."
    );
    expect(onPress).not.toHaveBeenCalled();
  });

  it("displays existing vehicle name and calls onPress", () => {
    useFetchVehicles.mockReturnValue({
      vehicles: [{ vehicleName: "MyCar" }],
      loading: false,
      error: null,
    });
    const { getByText } = render(<CarInfo selectedCar="" onPress={onPress} />);

    const button = getByText("MyCar");
    fireEvent.press(button);

    expect(onPress).toHaveBeenCalled();
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  it("shows selectedCar override over fetched vehicle", () => {
    useFetchVehicles.mockReturnValue({
      vehicles: [{ vehicleName: "MyCar" }],
      loading: false,
      error: null,
    });
    const { getByText } = render(<CarInfo selectedCar="X" onPress={onPress} />);

    expect(getByText("X")).toBeTruthy();
  });
});
