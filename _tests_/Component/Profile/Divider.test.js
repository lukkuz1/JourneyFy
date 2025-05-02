// __tests__/Divider.test.js
import React from "react";
import { render } from "@testing-library/react-native";
import Divider from "../../../src/components/Profile/Divider";
import { Colors, Sizes } from "../../src/constants/styles";

describe("<Divider />", () => {
  it("renders a horizontal line with correct style", () => {
    const { getByTestId } = render(<Divider testID="divider" />);
    const div = getByTestId("divider");
    const { backgroundColor, height, marginVertical } = div.props.style;
    expect(backgroundColor).toBe(Colors.lightGrayColor);
    expect(height).toBe(1.0);
    expect(marginVertical).toBe(Sizes.fixPadding * 2.0);
  });
});
