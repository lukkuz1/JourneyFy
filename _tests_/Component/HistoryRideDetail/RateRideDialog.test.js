// __tests__/RateRideDialog.test.js
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import RateRideDialog from "../../../src/components/HistoryRideDetail/RateRideDialog";
import { Alert, TextInput, TouchableOpacity, Image } from "react-native";
import firebase from "../../../src/services/firebase";

// stub Overlay
jest.mock("@rneui/themed", () => ({
  Overlay: ({ isVisible, children }) => (isVisible ? <>{children}</> : null),
}));

// stub icons
jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");
// stub firestore
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  serverTimestamp: jest.fn(),
}));

// stub firebase service
jest.mock("../../../src/services/firebase", () => ({
  auth: { currentUser: { uid: "u1" } },
  db: {},
}));

jest.spyOn(Alert, "alert").mockImplementation(() => {});

describe("RateRideDialog", () => {
  const baseProps = {
    isVisible: true,
    onClose: jest.fn(),
    rating: 2,
    setRating: jest.fn(),
    reviewText: "nice ride",
    setReviewText: jest.fn(),
    ride: { id: "r1", userId: "d1" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  



  it("edits review text", () => {
    const { getByPlaceholderText } = render(<RateRideDialog {...baseProps} />);
    const input = getByPlaceholderText("Palikite atsiliepimą...");
    fireEvent.changeText(input, "awesome");
    expect(baseProps.setReviewText).toHaveBeenCalledWith("awesome");
  });

  it("sends rating successfully", async () => {
    const { addDoc, collection } = require("firebase/firestore");
    addDoc.mockResolvedValue({});
    const { getByText } = render(<RateRideDialog {...baseProps} />);
    fireEvent.press(getByText("Siųsti"));
    await waitFor(() => {
      expect(collection).toHaveBeenCalledWith(
        {},
        "driver_ratings"
      );
      expect(addDoc).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith("Ačiū už vertinimą!");
      expect(baseProps.onClose).toHaveBeenCalled();
    });
  });

  it("alerts if missing driverId", async () => {
    const props = { ...baseProps, ride: { id: "r1" }, setRating: jest.fn(), setReviewText: jest.fn() };
    const { getByText } = render(<RateRideDialog {...props} />);
    fireEvent.press(getByText("Siųsti"));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Įvyko klaida: trūksta vairuotojo identifikatoriaus"
      );
    });
  });
});
