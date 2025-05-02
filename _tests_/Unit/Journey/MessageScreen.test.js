// __tests__/MessageScreen.test.js
import React from "react";
import { Text, KeyboardAvoidingView, Platform } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import MessageScreen from "../../../src/screens/TemplateJourney/message/messageScreen";
import firebase from "../src/services/firebase";
import useMessages from "../../../src/hooks/useMessages";
import useRideAndDriver from "../../../src/hooks/useRideAndDriver";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// --- Mocks ---

// Stub MyStatusBar
jest.mock("../src/components/myStatusBar", () => () => <Text testID="status-bar" />);

// Capture props for header, list, and input
const mockHeader = jest.fn();
jest.mock("../src/components/Message/MessageHeader", () => (props) => {
  mockHeader(props);
  return <Text testID="message-header" />;
});

const mockList = jest.fn();
jest.mock("../src/components/Message/MessageList", () => (props) => {
  mockList(props);
  return <Text testID="message-list" />;
});

jest.mock("../src/components/Message/MessageInput", () => (props) => (
  <Text testID="message-input" onPress={() => props.onSend("hello")} />
));

// Stub hooks
jest.mock("../src/hooks/useMessages");
jest.mock("../src/hooks/useRideAndDriver");

// Stub firebase auth & db
jest.mock("../src/services/firebase", () => ({
  auth: { currentUser: null },
  db: {},
}));

// Stub Firestore functions
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  serverTimestamp: jest.fn(),
}));

describe("MessageScreen", () => {
  const navigation = { navigate: jest.fn() };
  const rideId = "ride42";

  beforeEach(() => {
    jest.clearAllMocks();
    // Default hook returns
    useMessages.mockReturnValue([{ id: "m1", text: "hi" }]);
    useRideAndDriver.mockReturnValue([{ userId: "driverX" }, { name: "Driver X" }]);
    // serverTimestamp returns dummy
    serverTimestamp.mockReturnValue("TS");
    // collection returns a dummy ref
    collection.mockImplementation((db, col, id, sub) => ({ db, col, id, sub }));
  });

  it("renders header, list, input and passes correct props", () => {
    // Ensure a user is logged in so canSend logic isn't skipped
    firebase.auth.currentUser = { uid: "user1" };

    const { getByTestId } = render(
      <MessageScreen navigation={navigation} route={{ params: { rideId } }} />
    );

    // Status bar
    expect(getByTestId("status-bar")).toBeTruthy();

    // MessageHeader got navigation, driver, ride
    expect(mockHeader).toHaveBeenCalledWith({
      navigation,
      driver: { name: "Driver X" },
      ride: { userId: "driverX" },
    });
    expect(getByTestId("message-header")).toBeTruthy();

    // MessageList got messages and driverId
    expect(mockList).toHaveBeenCalledWith({
      messages: [{ id: "m1", text: "hi" }],
      driverId: "driverX",
    });
    expect(getByTestId("message-list")).toBeTruthy();

    // MessageInput renders
    expect(getByTestId("message-input")).toBeTruthy();
  });

  it("sends a message when input onSend is called and user is present", async () => {
    firebase.auth.currentUser = { uid: "user123" };

    const { getByTestId } = render(
      <MessageScreen navigation={navigation} route={{ params: { rideId } }} />
    );

    // Simulate pressing the input component's send trigger
    fireEvent.press(getByTestId("message-input"));

    // Expect addDoc to have been called once with correct args
    expect(collection).toHaveBeenCalledWith(
      firebase.db,
      "journeys",
      rideId,
      "messages"
    );
    expect(addDoc).toHaveBeenCalledWith(
      { db: {}, col: "journeys", id: rideId, sub: "messages" },
      {
        text: "hello",
        senderId: "user123",
        createdAt: "TS",
      }
    );
  });

  it("does not send when no user is logged in", () => {
    firebase.auth.currentUser = null;

    const { getByTestId } = render(
      <MessageScreen navigation={navigation} route={{ params: { rideId } }} />
    );
    fireEvent.press(getByTestId("message-input"));

    expect(addDoc).not.toHaveBeenCalled();
  });

  describe("KeyboardAvoidingView behavior prop", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("uses 'padding' on iOS", () => {
      jest.spyOn(Platform, "OS", "get").mockReturnValue("ios");
      firebase.auth.currentUser = { uid: "u" };

      const { UNSAFE_getByType } = render(
        <MessageScreen navigation={navigation} route={{ params: { rideId } }} />
      );
      const kval = UNSAFE_getByType(KeyboardAvoidingView);
      expect(kval.props.behavior).toBe("padding");
    });

    it("uses undefined on Android", () => {
      jest.spyOn(Platform, "OS", "get").mockReturnValue("android");
      firebase.auth.currentUser = { uid: "u" };

      const { UNSAFE_getByType } = render(
        <MessageScreen navigation={navigation} route={{ params: { rideId } }} />
      );
      const kval = UNSAFE_getByType(KeyboardAvoidingView);
      expect(kval.props.behavior).toBeUndefined();
    });
  });
});
