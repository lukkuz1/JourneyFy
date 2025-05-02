import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import CustomerSupportScreen from "../../../src/screens/TemplateProfile/customerSupport/customerSupportScreen";

jest.mock("../../../components/myStatusBar",       () => () => <Text testID="status-bar" />);
jest.mock("../../../components/header",            () => ({ title }) => <Text testID="header">{title}</Text>);
jest.mock("../../../components/CustomerSupport/ContactInfo",     () => () => <Text testID="contact-info" />);
jest.mock("../../../components/CustomerSupport/CallAndMailButtons", () => () => <Text testID="call-mail" />);
jest.mock("../../../components/CustomerSupport/SupportForm",      () => () => <Text testID="support-form" />);
jest.mock("../../../components/CustomerSupport/SubmitButton",     () => (props) => (
  <Text testID="submit-btn" onPress={props.onPress}>Submit</Text>
));

describe("CustomerSupportScreen", () => {
  const navigation = { pop: jest.fn() };

  it("renders all sections and navigates back on submit", () => {
    const { getByTestId, getByText } = render(
      <CustomerSupportScreen navigation={navigation} />
    );

    expect(getByTestId("status-bar")).toBeTruthy();
    expect(getByTestId("header").props.children).toBe("Klientų aptarnavimas");
    expect(getByTestId("contact-info")).toBeTruthy();
    expect(getByTestId("call-mail")).toBeTruthy();
    expect(getByTestId("support-form")).toBeTruthy();

    fireEvent.press(getByText("Submit"));
    expect(navigation.pop).toHaveBeenCalled();
  });
});
