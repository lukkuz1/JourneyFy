import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import CreditCardScreen from "../../../src/screens/TemplateWallet/creditCard/creditCardScreen";

jest.mock("../../../components/myStatusBar",  () => () => <Text testID="status-bar" />);
jest.mock("../../../components/header",       () => ({ title }) => <Text testID="header">{title}</Text>);
jest.mock("../../../components/CreditCard/PaypalForm", () => (props) => (
  <Text testID="paypal-form" onPress={() => props.onChange({ email:"e", password:"p" })} />
));
jest.mock("../../../components/CreditCard/ContinueButton", () => (props) => (
  <Text testID="continue-btn" onPress={props.onPress}>Go</Text>
));

describe("CreditCardScreen", () => {
  const navigation = { navigate: jest.fn() };
  const route = { params: { addFor: "send", amount: "50" } };

  it("renders form and navigates with correct params", () => {
    const { getByTestId } = render(
      <CreditCardScreen navigation={navigation} route={route} />
    );
    fireEvent.press(getByTestId("paypal-form"));
    fireEvent.press(getByTestId("continue-btn"));
    expect(navigation.navigate).toHaveBeenCalledWith("SuccessfullyAddAndSendScreen", {
      successFor: "send",
      paypalData: { email: "e", password: "p" },
      amount: "50",
    });
  });
});
