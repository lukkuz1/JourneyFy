// __tests__/AddVehicleScreen.test.js
import React from "react";
import { Text, ActivityIndicator } from "react-native";
import { render, fireEvent, act } from "@testing-library/react-native";
import AddVehicleScreen from "../../../src/screens/TemplateJourney/addVehicle/addVehicleScreen";
import { useAddVehicle } from "../../../src/hooks/useAddVehicle";

// --- Mock the useAddVehicle hook ---
jest.mock("../src/hooks/useAddVehicle");

// --- Stub out all child components ---
jest.mock("../src/components/myStatusBar",     () => () => <Text testID="status-bar" />);
jest.mock("../src/components/header",          () => ({ title }) => <Text testID="header">{title}</Text>);
jest.mock("../src/components/AddVehicle/VehicleForm", () => (props) => (
  <>
    <Text testID="vehicle-form" />
    <Text testID="open-image"    onPress={props.onOpenImagePicker}>Open Image</Text>
    <Text testID="open-type"     onPress={props.onOpenVehicleTypePicker}>Open Type</Text>
    <Text testID="open-seat"     onPress={props.onOpenSeatPicker}>Open Seat</Text>
  </>
));
jest.mock("../src/components/AddVehicle/ImagePickerBottomSheet", () => (props) =>
  props.isVisible ? (
    <>
      <Text testID="image-sheet" />
      <Text testID="pick-image" onPress={() => props.onPickImage("picked-uri")}>
        Pick Image
      </Text>
      <Text testID="close-image" onPress={props.onClose}>Close Image</Text>
    </>
  ) : null
);
jest.mock("../src/components/Home/NoOfSeatSheet", () => (props) =>
  props.isVisible ? (
    <>
      <Text testID="seat-sheet" />
      <Text testID="select-seat" onPress={() => props.onSelectSeat("4 seats")}>
        Select Seat
      </Text>
      <Text testID="close-seat" onPress={props.onClose}>Close Seat</Text>
    </>
  ) : null
);
jest.mock("../src/components/AddVehicle/VehicleTypeSheet", () => (props) =>
  props.isVisible ? (
    <>
      <Text testID="type-sheet" />
      <Text testID="select-type" onPress={() => props.onSelectVehicleType("SUV")}>
        Select Type
      </Text>
      <Text testID="close-type" onPress={props.onClose}>Close Type</Text>
    </>
  ) : null
);

describe("AddVehicleScreen", () => {
  const mockNav = { pop: jest.fn() };

  beforeEach(() => {
    mockNav.pop.mockClear();
  });

  it("renders and handles bottom sheets and add flow", async () => {
    // 1) Hook: not uploading, stub addVehicle
    const addVehicleMock = jest.fn().mockResolvedValue();
    useAddVehicle.mockReturnValue({
      uploading: false,
      addVehicle: addVehicleMock,
    });

    const { getByTestId, queryByTestId } = render(
      <AddVehicleScreen navigation={mockNav} />
    );

    // Header and status bar show
    expect(getByTestId("status-bar")).toBeTruthy();
    expect(getByTestId("header").props.children).toBe("Pridėti mašiną");

    // Initially, no sheets are visible
    expect(queryByTestId("image-sheet")).toBeNull();
    expect(queryByTestId("seat-sheet")).toBeNull();
    expect(queryByTestId("type-sheet")).toBeNull();

    // Open image picker sheet
    fireEvent.press(getByTestId("open-image"));
    expect(getByTestId("image-sheet")).toBeTruthy();

    // Pick an image → should close sheet
    fireEvent.press(getByTestId("pick-image"));
    expect(queryByTestId("image-sheet")).toBeNull();

    // Open seat sheet
    fireEvent.press(getByTestId("open-seat"));
    expect(getByTestId("seat-sheet")).toBeTruthy();

    // Select a seat → closes sheet
    fireEvent.press(getByTestId("select-seat"));
    expect(queryByTestId("seat-sheet")).toBeNull();

    // Open type sheet
    fireEvent.press(getByTestId("open-type"));
    expect(getByTestId("type-sheet")).toBeTruthy();

    // Select a type → closes sheet
    fireEvent.press(getByTestId("select-type"));
    expect(queryByTestId("type-sheet")).toBeNull();

    // Press "Pridėti" button to add vehicle
    await act(async () => {
      fireEvent.press(getByTestId("vehicle-form")); // ensure form rendered
      fireEvent.press(getByTestId("Pridėti"));       // note: TouchableOpacity has no testID, so we press by text?
    });
    // Actually, better to find by text:
    await act(async () => {
      fireEvent.press(getByText("Pridėti"));
    });

    // addVehicle called with the accumulated state
    expect(addVehicleMock).toHaveBeenCalledTimes(1);
    // navigation.pop should be called on success
    expect(mockNav.pop).toHaveBeenCalled();
  });

  it("shows uploading overlay when uploading=true", () => {
    // Hook: uploading true
    useAddVehicle.mockReturnValue({
      uploading: true,
      addVehicle: jest.fn(),
    });

    const { getByTestId, UNSAFE_getByType } = render(
      <AddVehicleScreen navigation={mockNav} />
    );

    // ActivityIndicator overlays screen
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });
});
