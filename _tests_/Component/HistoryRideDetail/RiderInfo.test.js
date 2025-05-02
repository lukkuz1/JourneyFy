// __tests__/RiderInfo.test.js
import React from "react";
import { render } from "@testing-library/react-native";
import RiderInfo from "../../../src/components/HistoryRideDetail/RiderInfo";
import { Image, Text } from "react-native";

describe("RiderInfo", () => {
  const ride = {
    profile: { uri: "http://img" },
    name: "John Doe",
    journeyDateTime: "2025-05-03 10:00",
    price: 12.5,
    date: "2025-05-03",
    time: "10:00",
  };

  it("renders profile image, name, datetime, and price", () => {
    const { getByText, UNSAFE_getByType } = render(<RiderInfo ride={ride} />);
    expect(UNSAFE_getByType(Image).props.source).toEqual({ uri: "http://img" });
    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("2025-05-03 10:00")).toBeTruthy();
    expect(getByText("12.5 €")).toBeTruthy();
  });

  it("falls back to date/time when journeyDateTime missing", () => {
    const r2 = { ...ride, journeyDateTime: null };
    const { getByText } = render(<RiderInfo ride={r2} />);
    expect(getByText("2025-05-03 10:00")).toBeTruthy();
  });
});
