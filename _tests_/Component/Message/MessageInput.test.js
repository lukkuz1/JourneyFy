// __tests__/MessageInput.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MessageInput from "../../../src/components/MessageInput";
import { TextInput, TouchableOpacity } from "react-native";

// Stub icons so they don't break rendering
jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");

describe("MessageInput", () => {
  it("renders input and send button, sends trimmed message and clears input", () => {
    const onSend = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <MessageInput onSend={onSend} />
    );
    const input = getByPlaceholderText("Įveskite savo žinutę...");
    const sendButton = getByTestId("message-input-send") || getByTestId("send-button");

    // type whitespace-only => no send
    fireEvent.changeText(input, "   ");
    fireEvent.press(sendButton);
    expect(onSend).not.toHaveBeenCalled();

    // type actual text
    fireEvent.changeText(input, " Hello ");
    fireEvent.press(sendButton);
    expect(onSend).toHaveBeenCalledWith("Hello");
    // input should be cleared
    expect(input.props.value).toBe("");
  });
});
