import React from "react";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import ProfileScreen from "../../../src/screens/TemplateProfile/profile/profileScreen";
import { useUserProfile } from "../../../src/hooks/useUserProfile";
import { useAuth } from "../../../src/hooks/useAuth";

jest.mock("../../../components/myStatusBar", () => () => <Text testID="status-bar" />);
jest.mock("../../../components/header",      () => ({ title }) => <Text testID="header">{title}</Text>);
jest.mock("../../../components/Profile/Divider", () => () => <Text testID="divider" />);
jest.mock("../../../components/Profile/LogoutDialog", () => (props) =>
  props.isVisible ? <Text testID="logout-dialog" onPress={props.onLogout}/> : null
);

jest.mock("../src/hooks/useUserProfile");
jest.mock("../src/hooks/useAuth");

describe("ProfileScreen", () => {
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    useUserProfile.mockReturnValue({
      user: { firstName: "John", lastName: "Doe", photoURL: null },
      fetchUserProfile: jest.fn(),
      refreshing: false,
      onRefresh: jest.fn(),
    });
    useAuth.mockReturnValue({ signOut: jest.fn() });
  });

  it("renders user info and options", () => {
    const { getByTestId, getByText } = render(<ProfileScreen navigation={navigation} />);
    expect(getByTestId("status-bar")).toBeTruthy();
    expect(getByTestId("header").props.children).toBe("Profilis");
    // ProfileInfo shows name
    expect(getByText("John")).toBeTruthy();
    expect(getByText("Doe")).toBeTruthy();
    // Tap edit icon (we stubbed nothing here, but ensure it exists)
  });

  it("opens logout dialog and signs out", () => {
    const { getAllByTestId, getByTestId } = render(<ProfileScreen navigation={navigation} />);
    // Find the "Atsijungti" option by text
    fireEvent.press(getByText("Atsijungti"));
    expect(getByTestId("logout-dialog")).toBeTruthy();
    fireEvent.press(getByTestId("logout-dialog"));
    expect(useAuth().signOut).toHaveBeenCalled();
  });
});
