// __tests__/VehicleForm.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import VehicleForm from "../../../src/components/AddVehicle/VehicleForm";
import { Image, Text } from "react-native";

// stub Ionicons
jest.mock("react-native-vector-icons/Ionicons", () => "Icon");

describe("VehicleForm", () => {
  const defaultData = {
    vehicleName: "",
    vehicleType: "",
    regNo: "",
    color: "",
    seat: "",
    facility: "",
    carImage: null,
  };
  const onChange = jest.fn();
  const onOpenImagePicker = jest.fn();
  const onOpenVehicleTypePicker = jest.fn();
  const onOpenSeatPicker = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it("renders camera placeholder when no image", () => {
    const { getByText, getByTestId } = render(
      <VehicleForm
        vehicleData={defaultData}
        onChange={onChange}
        onOpenImagePicker={onOpenImagePicker}
        onOpenVehicleTypePicker={onOpenVehicleTypePicker}
        onOpenSeatPicker={onOpenSeatPicker}
      />
    );
    expect(getByText("Pridėkite mašinos nuotrauką")).toBeTruthy();
  });

  it("calls onOpenImagePicker when image area pressed", () => {
    const { getByText } = render(
      <VehicleForm
        vehicleData={defaultData}
        onChange={onChange}
        onOpenImagePicker={onOpenImagePicker}
        onOpenVehicleTypePicker={onOpenVehicleTypePicker}
        onOpenSeatPicker={onOpenSeatPicker}
      />
    );
    fireEvent.press(getByText("Pridėkite mašinos nuotrauką"));
    expect(onOpenImagePicker).toHaveBeenCalled();
  });

  it("renders inputs and calls onChange correctly", () => {
    const { getByPlaceholderText } = render(
      <VehicleForm
        vehicleData={defaultData}
        onChange={onChange}
        onOpenImagePicker={onOpenImagePicker}
        onOpenVehicleTypePicker={onOpenVehicleTypePicker}
        onOpenSeatPicker={onOpenSeatPicker}
      />
    );

    const nameInput = getByPlaceholderText("Įveskite mašinos pavadinimą");
    fireEvent.changeText(nameInput, "MyCar");
    expect(onChange).toHaveBeenCalledWith("vehicleName", "MyCar");

    const regInput = getByPlaceholderText("Įveskite mašinos reg. nr.");
    fireEvent.changeText(regInput, "ABC123");
    expect(onChange).toHaveBeenCalledWith("regNo", "ABC123");
  });

  it("renders select inputs and triggers pickers", () => {
    const { getByText } = render(
      <VehicleForm
        vehicleData={defaultData}
        onChange={onChange}
        onOpenImagePicker={onOpenImagePicker}
        onOpenVehicleTypePicker={onOpenVehicleTypePicker}
        onOpenSeatPicker={onOpenSeatPicker}
      />
    );

    const typePlaceholder = getByText("Pasirinkite mašinos tipą");
    fireEvent.press(typePlaceholder);
    expect(onOpenVehicleTypePicker).toHaveBeenCalled();

    const seatPlaceholder = getByText("Pasirinkite vietų sk.");
    fireEvent.press(seatPlaceholder);
    expect(onOpenSeatPicker).toHaveBeenCalled();
  });
});
