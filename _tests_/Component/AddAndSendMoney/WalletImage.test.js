// __tests__/WalletImage.test.js
import React from "react";
import { render } from "@testing-library/react-native";
import WalletImage from "../../../src/components/AddAndSendMoney/WalletImage";
import { Image } from "react-native";

describe("WalletImage", () => {
  it("renders exactly one Image with correct styling", () => {
    const { UNSAFE_getByType } = render(<WalletImage />);
    const img = UNSAFE_getByType(Image);
    expect(img).toBeTruthy();

    // Style sanity check
    const style = img.props.style;
    expect(style).toHaveProperty("width");
    expect(style).toHaveProperty("height");
    expect(style).toHaveProperty("resizeMode", "contain");
  });
});
