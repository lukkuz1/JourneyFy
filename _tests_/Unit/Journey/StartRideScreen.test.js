import React from "react";
import { Text } from "react-native";
import { render, act } from "@testing-library/react-native";
import StartRideScreen from "../../../src/screens/TemplateJourney/startRide/startRideScreen";
import firebase from "../src/services/firebase";
import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";

// --- Mock firebase/auth & db ---
jest.mock("../src/services/firebase", () => ({ auth: {}, db: {} }));

// --- Mock Firestore ---
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  onSnapshot: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

// --- Stub child components ---
jest.mock("../../../components/myStatusBar", () => () => <Text testID="status-bar" />);
jest.mock("../../../components/header",          () => ({ title }) => <Text testID="header">{title}</Text>);
jest.mock("../../../components/StartRide/DirectionInfo", () => (props) => {
  // verify props.ride
  return <Text testID="direction-info">{props.ride.id}</Text>;
});
jest.mock("../../../components/StartRide/RideInfoSheet", () => (props) => (
  <Text testID="info-sheet">
    {props.passengers.map((p) => p.id).join(",")}
  </Text>
));
jest.mock("../../../components/StartRide/StartRideButton", () => (props) => (
  <Text testID="start-button" onPress={() => props.navigation.navigate("Next")} />
));

describe("StartRideScreen", () => {
  const ride = { id: "ride123", userId: "driverX" };
  let navigation;

  beforeEach(() => {
    navigation = { navigate: jest.fn() };
    jest.clearAllMocks();

    // stub Firestore builders
    collection.mockImplementation((...args) => args);
    query.mockImplementation((...args) => args);
    where.mockImplementation((...args) => args);
    doc.mockImplementation((...args) => args);

    // Manage onSnapshot + getDoc calls
    const regDoc = { data: () => ({ userId: "user1" }) };
    onSnapshot.mockImplementation((q, cb) => {
      cb({ docs: [regDoc] });
      return jest.fn();
    });
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ firstName: "Alice", lastName: "A" }),
    });
  });

  it("renders header and fetches approved passengers", async () => {
    const { getByTestId } = render(
      <StartRideScreen navigation={navigation} route={{ params: { ride } }} />
    );

    // status bar + header
    expect(getByTestId("status-bar")).toBeTruthy();
    expect(getByTestId("header").props.children).toBe("Kelionės pradžia");

    // wait for snapshot + getDoc
    await act(async () => Promise.resolve());

    // DirectionInfo gets ride.id
    expect(getByTestId("direction-info").props.children).toBe("ride123");

    // RideInfoSheet lists the fetched passenger
    expect(getByTestId("info-sheet").props.children).toContain("user1");
  });

  it("renders no passengers when none are approved", async () => {
    onSnapshot.mockImplementation((q, cb) => {
      cb({ docs: [] });
      return jest.fn();
    });

    const { getByTestId } = render(
      <StartRideScreen navigation={navigation} route={{ params: { ride } }} />
    );
    await act(async () => Promise.resolve());
    // info-sheet should be empty
    expect(getByTestId("info-sheet").props.children).toBe("");
  });
});
