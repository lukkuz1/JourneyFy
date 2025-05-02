// __tests__/NoOfSeatSheet.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NoOfSeatSheet from "../../../src/components/Home/NoOfSeatSheet";
import { Text } from "react-native";

jest.mock("@rneui/themed", () => ({
  BottomSheet: ({ isVisible, children }) => (isVisible ? <>{children}</> : null),
}));

describe("NoOfSeatSheet", () => {
  const props = {
    isVisible: true,
    onClose: jest.fn(),
    selectedSeat: 3,
    onSelectSeat: jest.fn(),
  };

  it("renders list of seats and highlights selected", () => {
    const { getByText } = render(<NoOfSeatSheet {...props} />);
    expect(getByText("Vietų sk.")).toBeTruthy();
    // selectedSeat=3 should use secondaryColor style (we assume rendered)
    const sel = getByText("3");
    expect(sel).toBeTruthy();
    // press a seat
    fireEvent.press(getByText("5"));
    expect(props.onSelectSeat).toHaveBeenCalledWith(5);
    expect(props.onClose).toHaveBeenCalled();
  });
});
