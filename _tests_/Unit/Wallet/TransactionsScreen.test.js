import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import TransactionsScreen from "../../../src/screens/TemplateWallet/transactions/transactionsScreen";

jest.mock("../../../components/myStatusBar",    () => () => <Text testID="status-bar" />);
jest.mock("../../../components/header",         () => ({ title }) => <Text testID="header">{title}</Text>);
jest.mock("../../../components/Transactions/TransactionList", () => (props) => (
  <Text testID="tx-list">{props.transactions.length}</Text>
));

describe("TransactionsScreen", () => {
  const navigation = {};
  it("renders the full transactions list", () => {
    const { getByTestId } = render(<TransactionsScreen navigation={navigation} />);
    expect(getByTestId("status-bar")).toBeTruthy();
    expect(getByTestId("header").props.children).toBe("Sandoris");
    expect(getByTestId("tx-list").props.children).toBe(12);
  });
});
