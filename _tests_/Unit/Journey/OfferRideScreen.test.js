// __tests__/OfferRideScreen.test.js
import React from "react";
import { Text, Alert } from "react-native";
import { render, fireEvent, act } from "@testing-library/react-native";
import { useRoute } from "@react-navigation/native";
import OfferRideScreen from "../../../src/screens/TemplateJourney/offerRide/offerRideScreen";
import useCreateJourney from "../../../src/hooks/useCreateJourney";
import { useFetchVehicles } from "../../../src/hooks/useFetchVehicles";

// --- Mock navigation & route ---
const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useRoute: jest.fn(),
}));

// --- Mock hooks ---
jest.mock("../src/hooks/useCreateJourney");
jest.mock("../src/hooks/useFetchVehicles");

// --- Stub all child components ---
jest.mock("../../../components/myStatusBar",     () => () => <Text testID="status-bar" />);
jest.mock("../../../components/header",           () => ({ title }) => <Text testID="header">{title}</Text>);
jest.mock("../../../components/OfferRide/LocationInfo", () => (props) => (
  <Text
    testID="location-info"
    onPress={() => {
      props.onPickupChange("P1");
      props.onDestinationChange("D1");
    }}
  />
));
jest.mock("../../../components/OfferRide/PriceInfo", () => (props) => (
  <Text testID="price-info" onPress={() => props.onPriceChange(currentPrice)} />
));
jest.mock("../../../components/OfferRide/CarInfo", () => (props) => (
  <Text testID="car-info" onPress={props.onPress} />
));
jest.mock("../../../components/OfferRide/SeatInfo", () => (props) => (
  <Text
    testID="seat-info"
    onPress={() => props.onPress()}
  >{props.selectedSeat ?? "no-seat"}</Text>
));
jest.mock("../../../components/OfferRide/FacilityInfo", () => (props) => (
  <Text testID="facility-info" onPress={() => props.onFacilitiesChange("fac")}/>
));
jest.mock("../../../components/OfferRide/ContinueButton", () => (props) => (
  <Text
    testID="continue-button"
    onPress={props.onPress}
  >
    {props.disabled ? "disabled" : "enabled"}
  </Text>
));
jest.mock("../../../components/OfferRide/CarSelectionSheet", () => (props) =>
  props.isVisible ? (
    <Text
      testID="car-sheet"
      onPress={() => props.onSelect("CarA")}
    />
  ) : null
);
jest.mock("../../../components/OfferRide/SeatSelectionSheet", () => (props) =>
  props.isVisible ? (
    <Text
      testID="seat-sheet"
      onPress={() => props.onSelect(3)}
    />
  ) : null
);

// A variable hook to control what PriceInfo sets
let currentPrice = "";

describe("OfferRideScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();

    // Default: no init params
    useRoute.mockReturnValue({ params: {} });

    // Stub vehicles hook: one vehicle
    useFetchVehicles.mockReturnValue({
      vehicles: [{ vehicleName: "CarA" }],
      loading: false,
    });

    // Stub create journey hook
    useCreateJourney.mockReturnValue({
      createJourney: jest.fn().mockResolvedValue("newJourneyId"),
      loading: false,
    });

    // Spy on alerts
    jest.spyOn(Alert, "alert").mockImplementation(() => {});
  });

  it("alerts when price is missing", async () => {
    const { getByTestId } = render(
      <OfferRideScreen navigation={{ navigate: mockNavigate }} />
    );

    // Continue w/o price => price === ""
    await act(async () => {
      fireEvent.press(getByTestId("continue-button"));
    });
    expect(Alert.alert).toHaveBeenCalledWith(
      "Trūksta kainos",
      "Prašome įvesti kainą už vietą."
    );
  });

  it("alerts when car is not selected", async () => {
    // set a valid price
    currentPrice = "12.5";

    const { getByTestId } = render(
      <OfferRideScreen navigation={{ navigate: mockNavigate }} />
    );

    // Enter price
    fireEvent.press(getByTestId("price-info"));
    // Continue => still missing car
    await act(async () => {
      fireEvent.press(getByTestId("continue-button"));
    });
    expect(Alert.alert).toHaveBeenCalledWith(
      "Trūksta automobilio",
      "Prašome pasirinkti savo automobilį."
    );
  });

  it("alerts on invalid (negative) price", async () => {
    currentPrice = "-5";

    const { getByTestId } = render(
      <OfferRideScreen navigation={{ navigate: mockNavigate }} />
    );

    // Select car first
    fireEvent.press(getByTestId("car-info"));
    // CarSelectionSheet appears and onSelect sets selectedCar
    fireEvent.press(getByTestId("car-sheet"));

    // Set price to negative
    fireEvent.press(getByTestId("price-info"));

    // Now continue => invalid price
    await act(async () => {
      fireEvent.press(getByTestId("continue-button"));
    });
    expect(Alert.alert).toHaveBeenCalledWith(
      "Neteisinga kaina",
      "Įveskite galiojančią kainą."
    );
  });

  it("opens car & seat sheets and selects values", () => {
    currentPrice = "10";

    // Provide required initial fields via route.params
    useRoute.mockReturnValue({
      params: {
        pickupAddress: "P1",
        destinationAddress: "D1",
        journeyDateTime: "2025-05-02T10:00",
        seats: 2,
      },
    });

    const { getByTestId, queryByTestId } = render(
      <OfferRideScreen navigation={{ navigate: mockNavigate }} />
    );

    // Car sheet should not be visible
    expect(queryByTestId("car-sheet")).toBeNull();

    // Open car sheet
    fireEvent.press(getByTestId("car-info"));
    expect(getByTestId("car-sheet")).toBeTruthy();
    // Select a car
    fireEvent.press(getByTestId("car-sheet"));
    expect(queryByTestId("car-sheet")).toBeNull();

    // Seat sheet hidden initially
    expect(queryByTestId("seat-sheet")).toBeNull();
    // Open seat sheet
    fireEvent.press(getByTestId("seat-info"));
    expect(getByTestId("seat-sheet")).toBeTruthy();
    // Select a seat
    fireEvent.press(getByTestId("seat-sheet"));
    expect(queryByTestId("seat-sheet")).toBeNull();
  });

  it("creates journey and navigates on success", async () => {
    currentPrice = "15";

    // Provide all required params
    useRoute.mockReturnValue({
      params: {
        pickupAddress: "P1",
        destinationAddress: "D1",
        journeyDateTime: "2025-05-02T10:00",
        seats: 2,
      },
    });

    // Use the same stub for createJourney
    const createJourneyMock = jest.fn().mockResolvedValue("jid123");
    useCreateJourney.mockReturnValue({ createJourney: createJourneyMock, loading: false });

    const { getByTestId } = render(
      <OfferRideScreen navigation={{ navigate: mockNavigate }} />
    );

    // Select car
    fireEvent.press(getByTestId("car-info"));
    fireEvent.press(getByTestId("car-sheet"));

    // Set price
    fireEvent.press(getByTestId("price-info"));

    // Continue
    await act(async () => {
      fireEvent.press(getByTestId("continue-button"));
    });

    // createJourney called with correct data
    expect(createJourneyMock).toHaveBeenCalledWith({
      pickupAddress: "P1",
      destinationAddress: "D1",
      journeyDateTime: "2025-05-02T10:00",
      seats: 2,
      journeyType: "offer",
      car: "CarA",
      price: 15,
      facilities: "",
      journeyId: undefined,
    });

    // navigation to ConfirmPoolingScreen
    expect(mockNavigate).toHaveBeenCalledWith("ConfirmPoolingScreen", {
      journeyId: "jid123",
    });
  });
});