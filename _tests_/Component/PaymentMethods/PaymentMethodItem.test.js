// __tests__/PaymentMethodItem.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PaymentMethodItem from "../../../src/components/PaymentMethods/PaymentMethodItem";

jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");

describe("PaymentMethodItem", () => {
  const item = {
    id: "1",
    paymentIcon: 123,  // dummy require
    paymentType: "Paypal",
  };

  it("renders icon, text, and radio button", () => {
    const onSelect = jest.fn();
    const { getByText, getByRole, UNSAFE_queryAllByType } = render(
      <PaymentMethodItem
        item={item}
        index={0}
        isSelected={false}
        onSelect={onSelect}
      />
    );

    // Text
    expect(getByText("Paypal")).toBeTruthy();

    // TouchableOpacity presses
    const touchables = UNSAFE_queryAllByType("TouchableOpacity");
    expect(touchables.length).toBeGreaterThanOrEqual(1);

    // Simulate press
    fireEvent.press(touchables[0]);
    expect(onSelect).toHaveBeenCalled();
  });

  it("shows border when selected", () => {
    const { getByTestId } = render(
      <PaymentMethodItem
        item={item}
        index={0}
        isSelected={true}
        onSelect={() => {}}
      />
    );
    // radioButton has borderWidth:7 when selected
    const radio = getByTestId("radio-0");
    expect(radio.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ borderWidth: 7 }),
      ])
    );
  });
});
