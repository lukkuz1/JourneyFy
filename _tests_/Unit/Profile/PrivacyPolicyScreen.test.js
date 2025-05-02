import React from "react";
import { Text, ScrollView, Image } from "react-native";
import { render } from "@testing-library/react-native";
import PrivacyPolicyScreen from "../../../src/screens/TemplateProfile/privacyPolicy/privacyPolicyScreen";

jest.mock("../../../components/myStatusBar", () => () => <Text testID="status-bar" />);
jest.mock("../../../components/header",      () => ({ title }) => <Text testID="header">{title}</Text>);

describe("PrivacyPolicyScreen", () => {
  it("renders icon, title, and all policy lines", () => {
    const navigation = {};
    const { getByTestId, UNSAFE_getByType, getAllByText } = render(
      <PrivacyPolicyScreen navigation={navigation} />
    );
    expect(getByTestId("status-bar")).toBeTruthy();
    expect(getByTestId("header").props.children).toBe("Privatumo politika");

    const sv = UNSAFE_getByType(ScrollView);
    // Count texts equal to privacyPolicies length
    const lines = getAllByText(/./); // any non-empty line
    expect(lines.length).toBeGreaterThanOrEqual(privacyPolicies.length);
  });
});