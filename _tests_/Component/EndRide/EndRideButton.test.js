// __tests__/EndRideButton.test.js
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import EndRideButton from "../../../src/components/EndRide/EndRideButton";
import firebaseServices from "../../../src/services/firebase";
import * as firestore from "firebase/firestore";

// mock Alert
import { Alert } from "react-native";
jest.spyOn(Alert, "alert").mockImplementation(() => {});

// mock firebase.db
firebaseServices.db = {};

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  updateDoc: jest.fn(),
}));

describe("EndRideButton", () => {
  const navigation = { popToTop: jest.fn() };
  const rideId = "ride123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls updateDoc, alerts success, and navigates on press", async () => {
    firestore.updateDoc.mockResolvedValue();
    const { getByText } = render(
      <EndRideButton navigation={navigation} rideId={rideId} />
    );
    fireEvent.press(getByText("Užbaigti kelionę"));
    await waitFor(() => {
      expect(firestore.doc).toHaveBeenCalledWith(
        firebaseServices.db,
        "journeys",
        rideId
      );
      expect(firestore.updateDoc).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith("Kelionė baigta");
      expect(navigation.popToTop).toHaveBeenCalled();
    });
  });

  it("alerts error if update fails", async () => {
    const error = new Error("fail");
    firestore.updateDoc.mockRejectedValue(error);
    console.error = jest.fn();
    const { getByText } = render(
      <EndRideButton navigation={navigation} rideId={rideId} />
    );
    fireEvent.press(getByText("Užbaigti kelionę"));
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("End ride error:", error);
      expect(Alert.alert).toHaveBeenCalledWith(
        "Klaida baigiant kelionę",
        error.message
      );
    });
  });
});
