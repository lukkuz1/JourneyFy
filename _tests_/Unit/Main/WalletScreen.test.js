// __tests__/WalletScreen.test.js
import React from "react";
import { Text, ScrollView } from "react-native";
import { render } from "@testing-library/react-native";
import WalletScreen from "../../../src/screens/Main/walletScreen";

// --- Mock child components ---
jest.mock("../src/components/myStatusBar", () => () => <Text testID="status-bar" />);
jest.mock("../src/components/Wallet/WalletHeader", () => ({ title }) => (
  <Text testID="wallet-header">{title}</Text>
));
jest.mock("../src/components/Wallet/WalletImage", () => () => (
  <Text testID="wallet-image" />
));
jest.mock("../src/components/Wallet/BalanceInfo", () => ({ navigation }) => (
  <Text testID="balance-info">{navigation?.testID || "no-nav"}</Text>
));

describe("WalletScreen", () => {
  const mockNav = { testID: "NAV", navigate: jest.fn() };

  it("renders status bar, header, image, and balance info", () => {
    const { getByTestId } = render(<WalletScreen navigation={mockNav} />);

    // Status bar
    expect(getByTestId("status-bar")).toBeTruthy();

    // Header with correct title
    const header = getByTestId("wallet-header");
    expect(header.props.children).toBe("Piniginė");

    // Wallet image
    expect(getByTestId("wallet-image")).toBeTruthy();

    // Balance info receives navigation prop
    const balance = getByTestId("balance-info");
    expect(balance.props.children).toBe("NAV");
  });

  it("configures the ScrollView correctly", () => {
    const { UNSAFE_getByType } = render(<WalletScreen navigation={mockNav} />);
    const sv = UNSAFE_getByType(ScrollView);

    expect(sv.props.showsVerticalScrollIndicator).toBe(false);
    expect(sv.props.contentContainerStyle).toMatchObject({ paddingBottom: 16 });
  });
});
