import React from "react";
import { Text, ScrollView } from "react-native";
import { render } from "@testing-library/react-native";
import TermsAndConditionsScreen from "../../../src/screens/TemplateProfile/termsAndConditions/termsAndConditionsScreen";

jest.mock("../../../components/myStatusBar", () => () => <Text testID="status-bar" />);
jest.mock("../../../components/header",      () => ({ title }) => <Text testID="header">{title}</Text>);

describe("TermsAndConditionsScreen", () => {
  it("renders all paragraphs inside a ScrollView", () => {
    const { getByTestId, UNSAFE_getByType, getAllByText } = render(
      <TermsAndConditionsScreen navigation={{}} />
    );
    expect(getByTestId("status-bar")).toBeTruthy();
    expect(getByTestId("header").props.children).toBe("Sąlygos ir sutikimai");

    const sv = UNSAFE_getByType(ScrollView);
    // there are 6 paragraphs
    expect(getAllByText(/Lorem ipsum/).length).toBeGreaterThanOrEqual(6);
  });
});
