// __tests__/AccountHolderInput.test.js
import React from "react";
import { render } from "@testing-library/react-native";
import AccountHolderInput from "../../../src/components/BankInfo/AccountHolderInput";

describe("AccountHolderInput", () => {
  it("renders label and placeholder input", () => {
    const { getByText, getByPlaceholderText } = render(<AccountHolderInput />);
    // Label
    expect(getByText("Sąskaitos savininko vardas")).toBeTruthy();
    // TextInput placeholder
    expect(
      getByPlaceholderText("Įveskite sąskaitos savininko vardą")
    ).toBeTruthy();
  });
});
