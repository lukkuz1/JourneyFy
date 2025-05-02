import React from "react";
import { Text, FlatList } from "react-native";
import { render } from "@testing-library/react-native";
import FaqScreen from "../../../src/screens/TemplateProfile/faq/faqScreen";

jest.mock("../../../components/myStatusBar", () => () => <Text testID="status-bar" />);
jest.mock("../../../components/header",      () => ({ title }) => <Text testID="header">{title}</Text>);

describe("FaqScreen", () => {
  const navigation = {};
  it("renders header and all FAQ items", () => {
    const { getByTestId, UNSAFE_getByType, getAllByText } = render(
      <FaqScreen navigation={navigation} />
    );
    expect(getByTestId("status-bar")).toBeTruthy();
    expect(getByTestId("header").props.children).toBe("D.U.K.");

    const list = UNSAFE_getByType(FlatList);
    expect(list.props.data.length).toBe(5);

    // ensure first question and answer appear
    expect(getAllByText(/Kaip rasti kelionę\?/).length).toBeGreaterThan(0);
  });
});
