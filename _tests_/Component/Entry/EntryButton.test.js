// __tests__/EntryButton.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import EntryButton from "../../../src/components/Entry/EntryButton";

describe("EntryButton", () => {
  it("renders with provided text and colors, and handles onPress", () => {
    const onPress = jest.fn();
    const { getByText, getByTestId } = render(
      <EntryButton
        text="Click Me"
        textColor="blue"
        buttonColor="red"
        margin={[10, 20, 30, 40]}
        onPress={onPress}
      />
    );

    // The text
    const btnText = getByText("Click Me");
    expect(btnText).toBeTruthy();
    // Style container margins
    const container = btnText.parent.parent; // Text -> View.inside -> Pressable -> View.rectangle
    const style = container.props.style;
    // style is an array; find the object with marginTop etc.
    const inline = style.find(s => typeof s === "object" && s.marginTop !== undefined);
    expect(inline.marginTop).toBe(10);
    expect(inline.marginBottom).toBe(20);
    expect(inline.marginLeft).toBe(30);
    expect(inline.marginRight).toBe(40);
    expect(inline.backgroundColor).toBe("red");

    // Pressing it fires onPress
    fireEvent.press(container.find(node => node.type === "Pressable"));
    expect(onPress).toHaveBeenCalled();
  });
});
