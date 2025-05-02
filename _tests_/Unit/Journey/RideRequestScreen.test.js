import React from "react";
import { Text, Alert } from "react-native";
import { render, act, fireEvent } from "@testing-library/react-native";
import RideRequestScreen from "../../../src/screens/TemplateJourney/rideRequest/rideRequestScreen";
import firebase from "../src/services/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

// --- Mock firebase/auth & db ---
jest.mock("../src/services/firebase", () => ({ auth: {}, db: {} }));

// --- Mock Firestore functions ---
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  onSnapshot: jest.fn(),
  updateDoc: jest.fn(),
  doc: jest.fn(),
}));

// --- Stub child components ---
jest.mock("../../../components/myStatusBar", () => () => <Text testID="status-bar" />);
jest.mock("../../../components/header",       () => ({ title }) => <Text testID="header">{title}</Text>);
jest.mock("../../../components/RideRequest/RequestList", () => (props) => (
  <Text
    testID="request-list"
    onPress={() => props.onRequestPress(props.requests[0])}
  >
    {props.requests.length}
  </Text>
));
jest.mock("../../../components/RideRequest/RequestSheet", () => (props) =>
  props.isVisible ? (
    <>
      <Text testID="request-sheet">
        {props.requestUsers.map((u) => u.id).join(",")}
      </Text>
      <Text
        testID="approve-btn"
        onPress={() => props.onApprove(props.requestUsers[0].id)}
      />
      <Text
        testID="close-btn"
        onPress={props.onClose}
      />
    </>
  ) : null
);

describe("RideRequestScreen", () => {
  let navigation;

  beforeEach(() => {
    navigation = { navigate: jest.fn() };
    jest.clearAllMocks();

    // stub logged-in user
    firebase.auth.currentUser = { uid: "driver1" };

    // stub Firestore collection/doc/query builders
    collection.mockImplementation((...args) => args);
    query.mockImplementation((...args) => args);
    where.mockImplementation((...args) => args);
    orderBy.mockImplementation((...args) => args);
    doc.mockImplementation((...args) => args);

    // Manage onSnapshot calls:
    // 1st call: journeys
    // 2nd call: registrations for ride[0]
    let call = 0;
    const journeyDoc = {
      id: "rideA",
      data: () => ({
        pickupAddress: "P1",
        destinationAddress: "D1",
        createdAt: 123,
        car: "CarX",
        price: 10,
        seats: 3,
      }),
    };
    const regDoc = {
      id: "userA",
      data: () => ({ userId: "userA", approvedByRider: false }),
    };
    onSnapshot.mockImplementation((q, cb) => {
      call += 1;
      if (call === 1) {
        // initial journeys
        cb({ docs: [journeyDoc] });
      } else {
        // registrations snapshot
        cb({ size: 1, docs: [regDoc] });
      }
      return jest.fn(); // unsubscribe
    });
  });

  it("fetches journeys and nested requests, opens sheet, approves, and updates", async () => {
    // spy on alerts
    jest.spyOn(Alert, "alert").mockImplementation(() => {});

    const { getByTestId, queryByTestId } = render(
      <RideRequestScreen navigation={navigation} />
    );

    // wait for both onSnapshot calls
    await act(() => Promise.resolve());

    // RequestList should show count=1
    const list = getByTestId("request-list");
    expect(list.props.children).toBe(1);

    // Open sheet
    fireEvent.press(list);
    expect(getByTestId("request-sheet").props.children).toContain("userA");

    // Approve userA
    await act(async () => {
      fireEvent.press(getByTestId("approve-btn"));
    });
    expect(updateDoc).toHaveBeenCalledWith(
      ["", "journeys", "rideA", "registered_journeys", "userA"],
      { approvedByRider: true }
    );
    expect(Alert.alert).toHaveBeenCalledWith("Keleivis patvirtintas");

    // requestUsers should remove userA
    expect(getByTestId("request-sheet").props.children).toBe("");
  });

  it("closes sheet when close button is pressed", async () => {
    const { getByTestId, queryByTestId } = render(
      <RideRequestScreen navigation={navigation} />
    );
    await act(() => Promise.resolve());
    // open
    fireEvent.press(getByTestId("request-list"));
    expect(getByTestId("request-sheet")).toBeTruthy();
    // close
    fireEvent.press(getByTestId("close-btn"));
    expect(queryByTestId("request-sheet")).toBeNull();
  });
});
