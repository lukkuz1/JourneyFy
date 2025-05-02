// __tests__/PaymentMethodList.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PaymentMethodList from "../../../src/components/PaymentMethods/PaymentMethodList";

describe("PaymentMethodList", () => {
  const methods = [
    { id: "a", paymentIcon: 1, paymentType: "A" },
    { id: "b", paymentIcon: 2, paymentType: "B" },
  ];
  it("renders items and allows selection", () => {
    const onSelectMethod = jest.fn();
    const { getByText } = render(
      <PaymentMethodList
        methods={methods}
        selectedMethodIndex={0}
        onSelectMethod={onSelectMethod}
      />
    );

    // Both items rendered
    expect(getByText("A")).toBeTruthy();
    expect(getByText("B")).toBeTruthy();

    // Press second item
    fireEvent.press(getByText("B"));
    expect(onSelectMethod).toHaveBeenCalledWith(1);
  });
});
