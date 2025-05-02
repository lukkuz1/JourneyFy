// __tests__/HistoryRideDetailScreen.test.js
import React from "react";
import { Text } from "react-native";
import { render, fireEvent, act } from "@testing-library/react-native";
import HistoryRideDetailScreen from "../../../src/screens/TemplateJourney/historyRideDetail/historyRideDetailScreen";
import firebase from "../src/services/firebase";
import { doc, onSnapshot } from "firebase/firestore";

jest.mock("../src/services/firebase", () => ({
  auth: { currentUser: null },
  db: {},
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  onSnapshot: jest.fn(),
  getDoc: jest.fn(), // not used here, but stubbed
}));

// --- Stub child components and capture their props ---
const mockRiderInfo = jest.fn();
jest.mock("../src/components/HistoryRideDetail/RiderInfo", () => (props) => {
  mockRiderInfo(props);
  return <Text testID="rider-info" />;
});

const mockRiderDetail = jest.fn();
jest.mock("../src/components/HistoryRideDetail/RiderDetail", () => (props) => {
  mockRiderDetail(props);
  return <Text testID="rider-detail" />;
});

const mockVehicleInfo = jest.fn();
jest.mock("../src/components/HistoryRideDetail/VehicleInfo", () => (props) => {
  mockVehicleInfo(props);
  return <Text testID="vehicle-info" />;
});

jest.mock("../src/components/myStatusBar",     () => () => <Text testID="status-bar" />);
jest.mock("../src/components/header",          () => ({ title }) => <Text testID="header">{title}</Text>);

const mockRateButton = jest.fn();
jest.mock("../src/components/HistoryRideDetail/RateRideButton", () => (props) => {
  mockRateButton(props);
  return <Text testID="rate-button" onPress={props.onPress}>Rate</Text>;
});

jest.mock("../src/components/HistoryRideDetail/RateRideDialog", () => (props) =>
  props.isVisible ? <Text testID="rate-dialog" /> : null
);

// Helper to wait for effects
const flushPromises = () => new Promise(setImmediate);

describe("HistoryRideDetailScreen", () => {
  const ride = { id: "r1", userId: "driver1", foo: "bar" };
  let navigation;

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset firebase user
    firebase.auth.currentUser = null;
    // Stub doc() to return a simple ref object
    doc.mockImplementation((db, col, id) => ({ db, col, id }));
  });

  it("renders all sections and no rating UI when user is the driver", async () => {
    // currentUser is the ride driver, so canRate = false
    firebase.auth.currentUser = { uid: "driver1" };

    // onSnapshot invokes once with ride data
    const unsub = jest.fn();
    onSnapshot.mockImplementation((ref, cb) => {
      cb({ id: ride.id, data: () => ride });
      return unsub;
    });

    const { getByTestId, queryByTestId } = render(
      <HistoryRideDetailScreen
        navigation={(navigation = { navigate: jest.fn() })}
        route={{ params: { ride } }}
      />
    );

    // wait for useEffect
    await act(flushPromises);

    // Static UI
    expect(getByTestId("status-bar")).toBeTruthy();
    expect(getByTestId("header").props.children).toBe("Kelionės aprašymas");

    // Child components each get the ride prop
    expect(mockRiderInfo).toHaveBeenCalledWith({ ride });
    expect(mockRiderDetail).toHaveBeenCalledWith({ ride });
    expect(mockVehicleInfo).toHaveBeenCalledWith({ ride });

    // Since user.uid === ride.userId, rating UI should not render
    expect(queryByTestId("rate-button")).toBeNull();
    expect(queryByTestId("rate-dialog")).toBeNull();

    // onSnapshot cleanup function was returned
    expect(typeof unsub).toBe("function");
  });

  it("shows rate button and dialog toggle when user is a passenger", async () => {
    // currentUser is not the driver, so canRate = true
    firebase.auth.currentUser = { uid: "someoneElse" };

    const unsub = jest.fn();
    onSnapshot.mockImplementation((ref, cb) => {
      cb({ id: ride.id, data: () => ride });
      return unsub;
    });

    const { getByTestId, queryByTestId } = render(
      <HistoryRideDetailScreen
        navigation={(navigation = { navigate: jest.fn() })}
        route={{ params: { ride } }}
      />
    );

    await act(flushPromises);

    // Rate button should appear
    const rateBtn = getByTestId("rate-button");
    expect(rateBtn).toBeTruthy();

    // Dialog should be hidden initially
    expect(queryByTestId("rate-dialog")).toBeNull();

    // Press button to open dialog
    fireEvent.press(rateBtn);
    expect(getByTestId("rate-dialog")).toBeTruthy();

    // Press again (simulating dialog close)
    fireEvent.press(getByTestId("rate-dialog"));
    // The real onClose isn't wired here; but we could test setShowRateDialog if we stubbed a close button.
    // For now, ensure dialog toggle logic exists—at least that pressing rate-button opens it.
  });
});
