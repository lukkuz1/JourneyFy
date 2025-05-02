// __tests__/CallAndMailButtons.test.js
import React from "react";
import { render } from "@testing-library/react-native";
import CallAndMailButtons from "../../../src/components/CustomerSupport/CallAndMailButtons";

describe("CallAndMailButtons", () => {
  it("renders both call and mail buttons with correct labels", () => {
    const { getByText } = render(<CallAndMailButtons />);
    expect(getByText("Paskambinkite mums")).toBeTruthy();
    expect(getByText("Parašykite mums")).toBeTruthy();
  });
});
