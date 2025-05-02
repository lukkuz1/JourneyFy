// __tests__/AmountInfo.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AmountInfo from "../../../src/components/AddAndSendMoney/AmountInfo";

describe("AmountInfo", () => {
  it("renders 'Pridėti sumą' when addFor='money'", () => {
    const setAmount = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <AmountInfo addFor="money" amount="" setAmount={setAmount} />
    );

    // Label
    expect(getByText("Pridėti sumą")).toBeTruthy();
    // TextInput placeholder
    const input = getByPlaceholderText("Įveskite sumą...");
    expect(input).toBeTruthy();

    // Simulate typing
    fireEvent.changeText(input, "123");
    expect(setAmount).toHaveBeenCalledWith("123");
  });

  it("renders 'Pridėkite siunčiamą sumą' when addFor!='money'", () => {
    const setAmount = jest.fn();
    const { getByText } = render(
      <AmountInfo addFor="send" amount="45" setAmount={setAmount} />
    );
    expect(getByText("Pridėkite siunčiamą sumą")).toBeTruthy();
  });
});
