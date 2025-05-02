// __tests__/ContactInfo.test.js
import React from "react";
import { render } from "@testing-library/react-native";
import ContactInfo from "../../../src/components/CustomerSupport/ContactInfo";
import { Image, Text } from "react-native";

describe("ContactInfo", () => {
  it("renders the support image and the title text", () => {
    const { UNSAFE_getByType, getByText } = render(<ContactInfo />);
    // Image
    const img = UNSAFE_getByType(Image);
    expect(img).toBeTruthy();
    // Text
    expect(getByText("Susitikime")).toBeTruthy();
  });
});
