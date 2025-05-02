// __tests__/DateTimePickerSheet.test.js
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import DateTimePickerSheet from "../../../src/components/Home/DateTimePickerSheet";
import { Text, TouchableOpacity } from "react-native";

// stub BottomSheet
jest.mock("@rneui/themed", () => ({
  BottomSheet: ({ isVisible, children, onBackdropPress }) =>
    isVisible ? <>{children}</> : null,
}));

// stub Calendar
jest.mock("react-native-calendars", () => ({
  Calendar: ({ onPressArrowLeft, onPressArrowRight, dayComponent }) => (
    <>{dayComponent({ date: { year: 2025, month: 5, day: 3 } })}</>
  ),
}));

// stub DashedLine
jest.mock("react-native-dashed-line", () => () => <Text>----</Text>);

// stub ScrollPicker
jest.mock("react-native-wheel-scrollview-picker", () => () => <Text>Picker</Text>);

describe("DateTimePickerSheet", () => {
  const props = {
    isVisible: true,
    onClose: jest.fn(),
    selectedDate: "2025-5-3",
    onSelectDate: jest.fn(),
    defaultDate: 3,
    setDefaultDate: jest.fn(),
    selectedHour: 5,
    onSelectHour: jest.fn(),
    selectedMinute: 15,
    onSelectMinute: jest.fn(),
    onConfirm: jest.fn(),
    todayDate: "2025-05-03",
  };

  it("renders header, calendar day, dashed line, pickers and confirm button", () => {
    const { getByText } = render(<DateTimePickerSheet {...props} />);
    expect(getByText("Pasirinkite datą ir laiką")).toBeTruthy();
    expect(getByText("3")).toBeTruthy(); // calendar day
    expect(getByText("----")).toBeTruthy(); // dashed line
    expect(getByText("Picker")).toBeTruthy(); // scroll pickers
    expect(getByText("Gerai")).toBeTruthy();
  });

  it("selects date and calls handlers", () => {
    const { getByText } = render(<DateTimePickerSheet {...props} />);
    fireEvent.press(getByText("3"));
    expect(props.onSelectDate).toHaveBeenCalledWith("2025-5-3");
    expect(props.setDefaultDate).toHaveBeenCalledWith(3);
  });

  it("confirms with full timestamp and closes", async () => {
    const { getByText } = render(<DateTimePickerSheet {...props} />);
    fireEvent.press(getByText("Gerai"));
    await waitFor(() => {
      expect(props.onConfirm).toHaveBeenCalledWith("2025-5-3 05:15");
      expect(props.onClose).toHaveBeenCalled();
    });
  });
});
