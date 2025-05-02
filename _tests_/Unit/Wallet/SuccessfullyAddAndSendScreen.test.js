import React from "react";
import { Text, Platform, BackHandler } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import SuccessfullyAddAndSendScreen from "../../../src/screens/TemplateWallet/successfullyAddAndSend/successfullyAddAndSendScreen";
import { useFocusEffect } from "@react-navigation/native";
import useUpdateWalletValueFromAmount from "../../../src/hooks/useUpdateWalletValueFromAmount";

jest.mock("../../../components/myStatusBar", () => () => <Text testID="status-bar" />);
jest.mock("@react-navigation/native",       () => ({ useFocusEffect: jest.fn() }));
jest.mock("../src/hooks/useUpdateWalletValueFromAmount");

describe("SuccessfullyAddAndSendScreen", () => {
  let navigation;
  beforeEach(() => {
    navigation = { navigate: jest.fn(), push: jest.fn(), addListener: jest.fn(), removeListener: jest.fn() };
    useFocusEffect.mockImplementation(cb => cb());
    jest.spyOn(BackHandler, "addEventListener");
    jest.spyOn(BackHandler, "removeEventListener");
  });

  it("displays add success text and navigates back", () => {
    useUpdateWalletValueFromAmount.mockReturnValue(200);
    const { getByText, getByTestId } = render(
      <SuccessfullyAddAndSendScreen
        navigation={navigation}
        route={{ params: { successFor: "money", amount: "50" } }}
      />
    );
    expect(getByTestId("status-bar")).toBeTruthy();
    expect(getByText("$50.00 pridėti")).toBeTruthy();
    expect(getByText("Sveikiname, pinigai sėkmingai įvesti į piniginę")).toBeTruthy();

    const back = getByText("Grįžti į pradžią");
    fireEvent.press(back);
    expect(navigation.navigate).toHaveBeenCalledWith("Wallet");
  });

  it("displays send success text", () => {
    useUpdateWalletValueFromAmount.mockReturnValue(100);
    const { getByText } = render(
      <SuccessfullyAddAndSendScreen
        navigation={navigation}
        route={{ params: { successFor: "send", amount: "30" } }}
      />
    );
    expect(getByText("$30.00 išsiųsti")).toBeTruthy();
    expect(getByText("Sveikiname, pinigai sėkmingai nusiųsti")).toBeTruthy();
  });

  it("registers Android back handler", () => {
    jest.spyOn(Platform, "OS", "get").mockReturnValue("android");
    render(
      <SuccessfullyAddAndSendScreen
        navigation={navigation}
        route={{ params: { successFor: "money", amount: "10" } }}
      />
    );
    expect(BackHandler.addEventListener).toHaveBeenCalledWith(
      "hardwareBackPress", expect.any(Function)
    );
  });
});
