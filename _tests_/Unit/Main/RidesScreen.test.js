// __tests__/RidesScreen.test.js
import React from "react";
import { Text } from "react-native";
import { render, act } from "@testing-library/react-native";
import RidesScreen from "../../../src/screens/Main/ridesScreen";
import firebase from "../src/services/firebase";
import { onSnapshot, getDoc } from "firebase/firestore";

// mock firebase service
jest.mock("../src/services/firebase", () => ({
  auth: { currentUser: { uid: "user1" } },
  db: {},
}));

// mock all Firestore functions we import
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  onSnapshot: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(),
}));

// mock out any native components / child components
jest.mock("../src/components/myStatusBar", () => () => null);
jest.mock("../src/components/Rides/RidesHeader", () => () => (
  <Text testID="header" />
));
jest.mock("../src/components/Rides/NoRidesInfo", () => () => (
  <Text testID="no-rides" />
));
jest.mock("../src/components/Rides/RidesList", () => (props) => (
  <Text testID="rides-list">{props.rides.length}</Text>
));

const flushPromises = () => new Promise(setImmediate);

describe("RidesScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders NoRidesInfo when there are no rides", async () => {
    // both driver and passenger queries yield empty snapshots
    onSnapshot.mockImplementation((_, callback) => {
      callback({ docs: [] });
      return jest.fn();
    });

    let tree;
    await act(async () => {
      tree = render(<RidesScreen navigation={{ navigate: jest.fn() }} />);
      await flushPromises();
    });

    expect(tree.getByTestId("no-rides")).toBeTruthy();
  });

  it("renders RidesList with merged rides when there are driver rides", async () => {
    // prepare one fake journey doc
    const fakeDoc = {
      id: "ride1",
      data: () => ({
        userId: "user1",
        journeyDateTime: "2025-05-02 10:00",
        pickupAddress: "Point A",
        destinationAddress: "Point B",
        car: "TestCar",
        facilities: ["ac"],
        journeyType: "one-way",
        price: 15,
        seats: 2,
        userEmail: "me@example.com",
        passengers: [],
        status: "pending",
      }),
    };

    // first onSnapshot: driver rides => [fakeDoc]
    // second onSnapshot: passenger rides => []
    onSnapshot
      .mockImplementationOnce((_, cb) => {
        cb({ docs: [fakeDoc] });
        return jest.fn();
      })
      .mockImplementationOnce((_, cb) => {
        cb({ docs: [] });
        return jest.fn();
      });

    // simulate getDoc failing (so mapJourney falls back to defaults)
    getDoc.mockResolvedValue({ exists: () => false });

    let tree;
    await act(async () => {
      tree = render(<RidesScreen navigation={{ navigate: jest.fn() }} />);
      await flushPromises();
    });

    // should render the <RidesList> mock with length=1
    const ridesList = tree.getByTestId("rides-list");
    expect(ridesList).toBeTruthy();
    expect(ridesList.props.children).toBe(1);
  });
});
