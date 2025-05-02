import React from "react";
import { Text, Alert } from "react-native";
import { render, fireEvent, act } from "@testing-library/react-native";
import RideDetailScreen from "../../../src/screens/TemplateJourney/rideDetail/rideDetailScreen";
import firebase from "../src/services/firebase";
import {
  doc,
  collection,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";

// stubs
jest.mock("../../../components/myStatusBar", () => () => <Text testID="status-bar" />);
jest.mock("../../../components/RideDetail/RideDetailHeader", () => () => <Text testID="header" />);
jest.mock("../../../components/RideDetail/RiderInfo", () => () => <Text testID="rider-info" />);
jest.mock("../../../components/RideDetail/RiderDetail", () => () => <Text testID="rider-detail" />);
jest.mock("../../../components/RideDetail/PassengerDetail", () => () => <Text testID="passenger-detail" />);
jest.mock("../../../components/RideDetail/VehicleInfo", () => () => <Text testID="vehicle-info" />);
jest.mock("../../../components/RideDetail/RideDetailFooter", () => (props) => (
  <Text
    testID="footer"
    onPress={() => props.ride.passengers?.length ? props.onCancelPress() : props.onRegisterPress()}
  />
));
jest.mock("../../../components/RideDetail/CancelRideDialog", () => (props) =>
  props.isVisible ? (
    <Text testID="cancel-dialog" onPress={props.onConfirm} />
  ) : null
);

jest.mock("../../../hooks/useDriver", () => () => ({ name: "Driver X" }));

describe("RideDetailScreen", () => {
  const ride = { id: "r1", userId: "uid", passengers: [] };
  let navigation;

  beforeEach(() => {
    navigation = { navigate: jest.fn(), goBack: jest.fn() };
    jest.clearAllMocks();
    // stub firebase user
    firebase.auth = { currentUser: null };
    // stub firestore helpers
    doc.mockImplementation((db, col, id) => ({ db, col, id }));
    collection.mockImplementation((ref, sub) => ({ ref, sub }));
    serverTimestamp.mockReturnValue("TS");
    setDoc.mockResolvedValue();
    updateDoc.mockResolvedValue();
    deleteDoc.mockResolvedValue();
    jest.spyOn(Alert, "alert").mockImplementation(() => {});
  });

  it("navigates to Login when registering unauthenticated", async () => {
    const { getByTestId } = render(
      <RideDetailScreen navigation={navigation} route={{ params: { ride } }} />
    );
    // footer press with empty passengers triggers register
    fireEvent.press(getByTestId("footer"));
    expect(navigation.navigate).toHaveBeenCalledWith("Login");
  });

  it("registers when authenticated", async () => {
    firebase.auth.currentUser = { uid: "user1" };
    const { getByTestId } = render(
      <RideDetailScreen navigation={navigation} route={{ params: { ride } }} />
    );
    await act(async () => {
      fireEvent.press(getByTestId("footer"));
    });
    expect(setDoc).toHaveBeenCalled();
    expect(updateDoc).toHaveBeenCalledWith(
      { db: {}, col: "journeys", id: "r1" },
      { passengers: arrayUnion("user1") }
    );
    expect(Alert.alert).toHaveBeenCalledWith("Sėkmingai užsiregistravote į kelionę");
  });

  it("opens cancel dialog and cancels when confirmed", async () => {
    // start with one passenger
    const rideWithPass = { ...ride, passengers: ["user1"] };
    firebase.auth.currentUser = { uid: "user1" };
    const { getByTestId, queryByTestId } = render(
      <RideDetailScreen
        navigation={navigation}
        route={{ params: { ride: rideWithPass } }}
      />
    );

    // first press opens cancel dialog
    fireEvent.press(getByTestId("footer"));
    expect(getByTestId("cancel-dialog")).toBeTruthy();

    // confirm cancellation
    await act(async () => {
      fireEvent.press(getByTestId("cancel-dialog"));
    });
    expect(deleteDoc).toHaveBeenCalled();
    expect(updateDoc).toHaveBeenCalledWith(
      { db: {}, col: "journeys", id: "r1" },
      { passengers: arrayRemove("user1") }
    );
    expect(Alert.alert).toHaveBeenCalledWith("Jūsų registracija atšaukta");
    expect(navigation.goBack).toHaveBeenCalled();
    expect(queryByTestId("cancel-dialog")).toBeNull();
  });
});
