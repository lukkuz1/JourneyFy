// __tests__/LocationFooter.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LocationFooter from "../../../src/components/PickLocation/LocationFooter";

describe("LocationFooter", () => {
  it("shows placeholder text when no address", () => {
    const onPick = jest.fn();
    const { getByText } = render(
      <LocationFooter address={""} onPickLocation={onPick} />
    );
    expect(getByText("Adresas nepasirinktas")).toBeTruthy();
  });

  it("displays provided address", () => {
    const addr = "Test Address";
    const { getByText } = render(
      <LocationFooter address={addr} onPickLocation={() => {}} />
    );
    expect(getByText(addr)).toBeTruthy();
  });

  it("calls onPickLocation when button pressed", () => {
    const onPick = jest.fn();
    const { getByText } = render(
      <LocationFooter address="A" onPickLocation={onPick} />
    );
    fireEvent.press(getByText("Pasirinkite šią vietą"));
    expect(onPick).toHaveBeenCalled();
  });
});
