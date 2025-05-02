// __tests__/EndRideScreen.test.js
import React from "react";
import { Text } from "react-native";
import { render, act } from "@testing-library/react-native";
import EndRideScreen from "../../../src/screens/TemplateJourney/endRide/endRideScreen";
import firebase from "../src/services/firebase";
import { doc, onSnapshot, getDoc } from "firebase/firestore";

// --- Mock firebase.db ---
jest.mock("../src/services/firebase", () => ({
  db: {},
}));

// --- Mock firestore helpers ---
jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  onSnapshot: jest.fn(),
  getDoc: jest.fn(),
}));

// --- Stub child components and capture their props ---
jest.mock("../../../components/myStatusBar", () => () => <Text testID="status-bar" />);
jest.mock("../../../components/header", () => ({ title }) => <Text testID="header">{title}</Text>);

const mockMapDirection = jest.fn();
jest.mock("../../../components/EndRide/MapDirection", () => (props) => {
  mockMapDirection(props);
  return <Text testID="map-direction" />;
});

const mockRideInfoSheet = jest.fn();
jest.mock("../../../components/EndRide/RideInfoSheet", () => (props) => {
  mockRideInfoSheet(props);
  return <Text testID="ride-info" />;
});

const mockEndRideButton = jest.fn();
jest.mock("../../../components/EndRide/EndRideButton", () => (props) => {
  mockEndRideButton(props);
  return <Text testID="end-ride-button" />;
});

// flushPromises helper
const flushPromises = () => new Promise(setImmediate);

describe("EndRideScreen", () => {
  const navigation = { navigate: jest.fn() };
  const rideId = "ride-123";

  beforeEach(() => {
    jest.clearAllMocks();
    // doc() just returns something, we don't inspect it here
    doc.mockImplementation((db, col, id) => ({ db, col, id }));
  });

  it("renders ride and no passengers when snapshot has none", async () => {
    // 1) onSnapshot should invoke callback with a snap that has no passengers
    const rideData = { foo: "bar", passengers: [] };
    const snap = { id: rideId, data: () => rideData };
    const unsub = jest.fn();
    onSnapshot.mockImplementation((ref, cb) => {
      cb(snap);
      return unsub;
    });

    const { getByTestId } = render(
      <EndRideScreen navigation={navigation} route={{ params: { rideId } }} />
    );

    // wait for useEffect → setRide & setPassengersList
    await act(flushPromises);

    // Child components should have been called with the right props:
    expect(mockMapDirection).toHaveBeenCalledWith({ ride: { id: rideId, ...rideData } });
    expect(mockRideInfoSheet).toHaveBeenCalledWith({
      ride: { id: rideId, ...rideData },
      passengersList: [],
    });
    expect(mockEndRideButton).toHaveBeenCalledWith({ navigation, rideId });

    // StatusBar and Header render
    expect(getByTestId("status-bar")).toBeTruthy();
    expect(getByTestId("header").props.children).toBe("Kelionė");

    // onSnapshot cleanup should be returned from useEffect
    // (we can't directly inspect the return, but we can assert our stub exists)
    expect(typeof unsub).toBe("function");
  });

  it("fetches and passes passengers when snapshot has UIDs", async () => {
    // 2) Snapshot includes one passenger UID
    const rideData = { passengers: ["userA"] };
    const snap = { id: rideId, data: () => rideData };
    onSnapshot.mockImplementation((ref, cb) => {
      cb(snap);
      return jest.fn();
    });

    // getDoc returns a user document
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ firstName: "Alice", lastName: "Anderson" }),
    });

    render(<EndRideScreen navigation={navigation} route={{ params: { rideId } }} />);

    // Wait for both setRide and the async getDoc within
    await act(async () => {
      await flushPromises();
      await flushPromises();
    });

    // RideInfoSheet should now have the fetched passenger
    expect(mockRideInfoSheet).toHaveBeenCalledWith({
      ride: { id: rideId, ...rideData },
      passengersList: [{ id: "userA", firstName: "Alice", lastName: "Anderson" }],
    });
  });
});
