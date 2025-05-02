// __tests__/PassengerList.test.js
import React from "react";
import { render } from "@testing-library/react-native";
import PassengerList from "../../../src/components/EndRide/PassengerList";
import { Image, Text } from "react-native";

describe("PassengerList", () => {
  it("renders null when no passengers", () => {
    const { container } = render(<PassengerList passengersList={[]} />);
    expect(container.children.length).toBe(0);
  });

  it("renders each passenger with image and name", () => {
    const data = [
      { id: "1", firstName: "A", lastName: "B", photoURL: null },
      { id: "2", firstName: "C", lastName: "D", photoURL: "http://img" },
    ];
    const { getAllByTestId, getByText } = render(
      <PassengerList passengersList={data} />
    );
    // Two Image components
    const images = getAllByTestId("RN__CUSTOM_IMAGE"); // RN >= 0.71 has testID RN__CUSTOM_IMAGE
    expect(images.length).toBe(2);
    // Names
    expect(getByText("A B")).toBeTruthy();
    expect(getByText("C D")).toBeTruthy();
  });
});
