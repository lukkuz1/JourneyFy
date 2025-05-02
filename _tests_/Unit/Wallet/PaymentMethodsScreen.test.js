import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import PaymentMethodsScreen from "../../../src/screens/TemplateWallet/paymentMethods/paymentMethodsScreen";

jest.mock("../../../components/myStatusBar",          () => () => <Text testID="status-bar" />);
jest.mock("../../../components/header",               () => ({ title }) => <Text testID="header">{title}</Text>);
jest.mock("../../../components/PaymentMethods/PaymentMethodList", () => (props) => (
  <Text testID="methods-list">{props.methods.length}</Text>
));

describe("PaymentMethodsScreen", () => {
  const navigation = { navigate: jest.fn() };
  
  it("shows button text for add and navigates", () => {
    const route = { params: { addFor: "money", amount: "20" } };
    const { getByText } = render(
      <PaymentMethodsScreen navigation={navigation} route={route} />
    );
    const btn = getByText("Pridėti ($20)");
    fireEvent.press(btn);
    expect(navigation.navigate).toHaveBeenCalledWith("CreditCardScreen", { addFor:"money", amount:"20" });
  });

  it("defaults amount to 0 and shows send text", () => {
    const route = { params: { addFor: "send" } };
    const { getByText } = render(
      <PaymentMethodsScreen navigation={navigation} route={route} />
    );
    expect(getByText("Siųsti ($0)")).toBeTruthy();
  });
});
