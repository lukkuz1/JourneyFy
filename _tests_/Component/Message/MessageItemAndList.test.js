// __tests__/MessageItemAndList.test.js
import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import MessageItem from "../../../src/components/Message/MessageItem";
import MessageList from "../../../src/components/Message/MessageList";
import { Text, Image } from "react-native";

// stub firebase services and firestore
jest.mock("../../../src/services/firebase", () => ({
  auth: { currentUser: { uid: "u1" } },
  db: {},
}));
jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

// stub MaterialIcons so test doesn’t error
jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");

describe("MessageItem", () => {
  beforeEach(() => {
    const { getDoc } = require("firebase/firestore");
    // return a user document with firstName, lastName, photoURL
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ firstName: "Alice", lastName: "Smith", photoURL: "http://avatar" }),
    });
  });

  it("renders sender nickname, message text, time and avatar alignment", async () => {
    const item = { id: "m1", senderId: "u1", isSender: true, message: "Hi", time: "12:00" };
    const { getByText, getByType, getByProps } = render(
      <MessageItem item={item} driverId="x" />
    );

    // Wait for useEffect → setSender
    await waitFor(() => {
      expect(getByText("Alice Smith")).toBeTruthy();
    });
    expect(getByText("Hi")).toBeTruthy();
    expect(getByText("12:00")).toBeTruthy();
    // avatar image
    const img = getByType(Image);
    expect(img.props.source).toEqual({ uri: "http://avatar" });
    // bubble alignment: since isSender=true, parent flexDirection='row-reverse'
    const wrapper = getByProps({ style: expect.any(Object) });
    // we can check that its style.flexDirection endsWith 'row-reverse'
    const styleObj = wrapper.props.style;
    expect(styleObj.flexDirection || styleObj[0].flexDirection).toBe("row-reverse");
  });
});

describe("MessageList", () => {
  it("renders a list of messages", () => {
    const messages = [
      { id: "1", senderId: "a", isSender: false, message: "Hello", time: "10:00" },
      { id: "2", senderId: "b", isSender: true, message: "World", time: "11:00" },
    ];
    const { getByText } = render(<MessageList messages={messages} driverId="a" />);
    expect(getByText("Hello")).toBeTruthy();
    expect(getByText("World")).toBeTruthy();
  });
});
