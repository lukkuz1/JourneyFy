import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import BankInfoScreen from "../../../src/screens/TemplateWallet/bankInfo/bankInfoScreen";

jest.mock("../../../components/myStatusBar",       () => () => <Text testID="status-bar" />);
jest.mock("../../../components/header",            () => ({ title }) => <Text testID="header">{title}</Text>);
jest.mock("../../../components/BankInfo/AccountHolderInput", () => () => <Text testID="holder-input" />);
jest.mock("../../../components/BankInfo/BankNameInput",      () => (props) => (
  <Text testID="bank-input" onPress={() => props.onChangeText("BankX")} />
));
jest.mock("../../../components/BankInfo/BranchCodeInput",    () => (props) => (
  <Text testID="branch-input" onPress={() => props.onChangeText("001")} />
));
jest.mock("../../../components/BankInfo/AccountNumberInput", () => (props) => (
  <Text testID="account-input" onPress={() => props.onChangeText("1234")} />
));
jest.mock("../../../components/BankInfo/SubmitButton",       () => (props) => (
  <Text testID="submit-btn" onPress={props.onPress}>Submit</Text>
));

describe("BankInfoScreen", () => {
  const navigation = { navigate: jest.fn() };
  it("renders inputs and navigates on submit", () => {
    const { getByTestId } = render(<BankInfoScreen navigation={navigation} />);
    expect(getByTestId("holder-input")).toBeTruthy();
    expect(getByTestId("bank-input")).toBeTruthy();
    expect(getByTestId("branch-input")).toBeTruthy();
    expect(getByTestId("account-input")).toBeTruthy();

    fireEvent.press(getByTestId("submit-btn"));
    expect(navigation.navigate).toHaveBeenCalledWith("SuccessfullyAddAndSendScreen", {
      successFor: "bank",
    });
  });
});
