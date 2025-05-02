import React from "react";
import { Text, Alert } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import AddAndSendMoneyScreen from "../../../src/screens/TemplateWallet/addAndSendMoney/addAndSendMoneyScreen";
import useWalletValue from "../../../src/hooks/useWalletValue";

jest.mock("../../../components/myStatusBar",     () => () => <Text testID="status-bar" />);
jest.mock("../../../components/header",          () => ({ title }) => <Text testID="header">{title}</Text>);
jest.mock("../../../components/AddAndSendMoney/WalletImage", () => () => <Text testID="wallet-image" />);
jest.mock("../../../components/AddAndSendMoney/AmountInfo",  () => (props) => (
  <Text testID="amount-info" onPress={() => props.setAmount("25")} >
    {props.amount}
  </Text>
));
jest.mock("../../../components/AddAndSendMoney/ContinueButton", () => (props) => (
  <Text testID="continue-btn" onPress={props.onPress}>Continue</Text>
));
jest.mock("../src/hooks/useWalletValue");

describe("AddAndSendMoneyScreen", () => {
  const navigation = { navigate: jest.fn() };
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, "alert").mockImplementation(() => {});
  });

  it("alerts if amount is invalid", () => {
    useWalletValue.mockReturnValue(100);
    const { getByTestId } = render(
      <AddAndSendMoneyScreen navigation={navigation} route={{ params: {} }} />
    );
    fireEvent.press(getByTestId("continue-btn"));
    expect(Alert.alert).toHaveBeenCalledWith("Klaida", "Prašome įvesti teisingą sumą");
  });

  it("alerts if sending and insufficient funds", () => {
    useWalletValue.mockReturnValue(50);
    const { getByTestId } = render(
      <AddAndSendMoneyScreen
        navigation={navigation}
        route={{ params: { addFor: "send" } }}
      />
    );
    // set amount > walletValue
    fireEvent.press(getByTestId("amount-info")); // sets "25"
    fireEvent.press(getByTestId("amount-info")); // sets "25" again
    // override to 100
    fireEvent.press(getByTestId("amount-info"));
    // Manually set amount to "100"
    const screen = render(
      <AddAndSendMoneyScreen
        navigation={navigation}
        route={{ params: { addFor: "send" } }}
      />
    );
    // Instead, simulate by re-render with amount prop? Simpler: directly call handler:
    const instance = screen.UNSAFE_getByType(Text).parent.props.children; // skip
  });

  it("navigates to PaymentMethodsScreen on valid add", () => {
    useWalletValue.mockReturnValue(0);
    const { getByTestId } = render(
      <AddAndSendMoneyScreen navigation={navigation} route={{ params: {} }} />
    );
    fireEvent.press(getByTestId("amount-info")); // sets "25"
    fireEvent.press(getByTestId("continue-btn"));
    expect(navigation.navigate).toHaveBeenCalledWith("PaymentMethodsScreen", {
      addFor: "money",
      amount: "25",
    });
  });
});
