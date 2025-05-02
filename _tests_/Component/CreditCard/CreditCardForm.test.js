// __tests__/CreditCardForm.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CreditCardForm from "../../../src/components/CreditCard/CreditCardForm";
import { Text, TouchableOpacity } from "react-native";

// Stub the CreditCardInput from `react-native-credit-card-input`
jest.mock("react-native-credit-card-input", () => ({
  CreditCardInput: ({ onChange, requiresName, requiresCVC }) => (
    <>
      <Text testID="cc-requiresName">{String(requiresName)}</Text>
      <Text testID="cc-requiresCVC">{String(requiresCVC)}</Text>
      <TouchableOpacity
        testID="cc-change"
        onPress={() => onChange({ number: "4111" })}
      >
        <Text>Simulate Change</Text>
      </TouchableOpacity>
    </>
  ),
}));

describe("CreditCardForm", () => {
  it("passes props to CreditCardInput and handles onChange", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<CreditCardForm onChange={onChange} />);

    // It should render our stub with the proper flags
    expect(getByTestId("cc-requiresName").props.children).toBe("true");
    expect(getByTestId("cc-requiresCVC").props.children).toBe("true");

    // Simulate user entering card info
    fireEvent.press(getByTestId("cc-change"));
    expect(onChange).toHaveBeenCalledWith({ number: "4111" });
  });
});
