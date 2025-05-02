import React from "react";
import { Text } from "react-native";
import { render, act } from "@testing-library/react-native";
import RideHistoryScreen from "../../../src/screens/TemplateProfile/rideHistory/rideHistoryScreen";
import firebase from "../../../src/services/firebase";
import { collection, query, where, orderBy, onSnapshot, getDoc, doc } from "firebase/firestore";

jest.mock("../../../components/myStatusBar", () => () => <Text testID="status-bar" />);
jest.mock("../../../components/RideHistory/RidesHeader", () => () => <Text testID="header" />);
jest.mock("../../../components/RideHistory/EmptyRideList", () => () => <Text testID="empty" />);
jest.mock("../../../components/RideHistory/RideHistoryList", () => (props) => (
  <Text testID="list">{props.rides.length}</Text>
));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  onSnapshot: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(),
}));

describe("RideHistoryScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    firebase.auth = { currentUser: { uid: "u" } };
    collection.mockImplementation((...a) => a);
    query.mockImplementation((...a) => a);
    where.mockImplementation((...a) => a);
    orderBy.mockImplementation((...a) => a);
    doc.mockImplementation((...a) => a);
  });

  it("shows empty list when no rides", async () => {
    onSnapshot.mockImplementation((q, cb) => { cb({ docs: [] }); return jest.fn(); });
    const { getByTestId } = render(<RideHistoryScreen navigation={{}} />);
    await act(() => Promise.resolve());
    expect(getByTestId("empty")).toBeTruthy();
  });

  it("renders merged rides when snapshots return data", async () => {
    const snapA = { docs: [{ id: "r1", data: () => ({ userId: "u", journeyDateTime: "2025-05-02 10:00", pickupAddress:"P",destinationAddress:"D",car:"C",facilities:[],journeyType:"",price:0,seats:1,userEmail:"e" }) }]};
    const snapB = { docs: [] };
    onSnapshot
      .mockImplementationOnce((q, cb) => { cb(snapA); return jest.fn(); })
      .mockImplementationOnce((q, cb) => { cb(snapB); return jest.fn(); });
    // stub getDoc inside mapJourney
    getDoc.mockResolvedValue({ exists: () => false });
    const { getByTestId } = render(<RideHistoryScreen navigation={{}} />);
    await act(async () => Promise.resolve());
    await act(async () => Promise.resolve());
    expect(getByTestId("list").props.children).toBe(1);
  });
});
