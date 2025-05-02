// __tests__/Header.test.js
import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Header from "../../../src/components/Home/Header";
import { Image, Text } from "react-native";
import * as authModule from "firebase/auth";
import { useUserProfile } from "../../../src/hooks/useUserProfile";

// stub useUserProfile
jest.mock("../../../src/hooks/useUserProfile");
jest.mock("@react-navigation/native", () => ({
  useFocusEffect: (fn) => fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: () => ({ currentUser: { uid: "u1" } }),
}));

describe("Header", () => {
  beforeEach(() => {
    useUserProfile.mockReturnValue({
      user: { firstName: "Jane", lastName: "Doe", photoURL: null },
      fetchUserProfile: jest.fn(),
      refreshing: false,
      onRefresh: jest.fn(),
    });
  });

  it("renders greeting with user name and default location", async () => {
    const { getByText, UNSAFE_getByType } = render(<Header />);
    await waitFor(() => {
      expect(getByText("Labas, Jane Doe")).toBeTruthy();
      expect(getByText("Lietuva")).toBeTruthy();
      // fallback image
      const img = UNSAFE_getByType(Image);
      expect(img.props.source).toBe(require("../../../src/assets/images/user/user1.jpeg"));
    });
  });

  it("updates when location prop provided", () => {
    const { getByText } = render(<Header location="Kaunas" />);
    expect(getByText("Kaunas")).toBeTruthy();
  });
});
