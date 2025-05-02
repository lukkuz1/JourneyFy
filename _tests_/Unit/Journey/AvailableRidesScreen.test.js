// __tests__/AvailableRidesScreen.test.js
import React from "react";
import { Text, FlatList, TouchableOpacity } from "react-native";
import { render, fireEvent, act } from "@testing-library/react-native";
import AvailableRidesScreen from "../../../src/screens/TemplateJourney/availableRides/availableRidesScreen";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// --- Mocks ---

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock("../../../components/myStatusBar",   () => () => <Text testID="status-bar" />);
jest.mock("../../../components/header",        () => ({ title }) => <Text testID="header">{title}</Text>);
jest.mock("react-native-vector-icons/MaterialIcons", () => "MaterialIcons");
jest.mock("react-native-dashed-line",          () => "DashedLine");

// Helper to wait all promises in useEffect
const flushPromises = () => new Promise(setImmediate);

describe("AvailableRidesScreen", () => {
  const mockNav = { navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    // firestore stub
    getFirestore.mockReturnValue({}); 
    doc.mockImplementation((db, col, id) => ({ db, col, id }));
    // simulate a driver document
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({
        firstName: "Jane",
        lastName: "Roe",
        photoURL: "https://example.com/jane.jpg",
        phoneNumber: "123-456",
      }),
    });
  });

  it("shows fallback when there are no rides with seats", () => {
    const { getByTestId, getByText } = render(
      <AvailableRidesScreen navigation={mockNav} route={{ params: {} }} />
    );

    // Loading bar always present
    expect(getByTestId("status-bar")).toBeTruthy();
    // No rides message
    expect(getByText("No available rides found.")).toBeTruthy();
  });

  it("renders a FlatList of available rides and a fully hydrated RideItem", async () => {
    const ride = {
      id: "ride1",
      userId: "user1",
      seats: 3,
      pickupAddress: "Point A",
      destinationAddress: "Point B",
      amount: 25,
      journeyDateTime: "2025-05-02 14:30",
    };

    const { getByTestId, UNSAFE_getByType, getByText, getAllByType } = render(
      <AvailableRidesScreen
        navigation={mockNav}
        route={{ params: { journeys: [ride] } }}
      />
    );

    // Header and status bar
    expect(getByTestId("status-bar")).toBeTruthy();
    expect(getByTestId("header").props.children).toBe("Surastos kelionės");

    // FlatList should have exactly one item
    const list = UNSAFE_getByType(FlatList);
    expect(list.props.data).toHaveLength(1);

    // Wait for the useEffect in RideItem to fetch driver
    await act(flushPromises);

    // Now the driver name and phone appear
    expect(getByText("Jane Roe")).toBeTruthy();
    expect(getByText("Telefonas: 123-456")).toBeTruthy();

    // The amount displays as “$25”
    expect(getByText("$25")).toBeTruthy();

    // Pressing the TouchableOpacity navigates correctly
    const touchables = getAllByType(TouchableOpacity);
    fireEvent.press(touchables[0]);
    expect(mockNav.navigate).toHaveBeenCalledWith("RideDetailScreen", { ride });
  });
});
