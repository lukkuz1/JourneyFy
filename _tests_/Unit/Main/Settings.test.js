// __tests__/Settings.test.js
import React from "react";
import { Text } from "react-native";
import { render, fireEvent, act } from "@testing-library/react-native";
import Settings from "../../../src/screens/Main/Settings";
import { getAuth } from "firebase/auth";
import { useMapSettings } from "../../../src/hooks/useMapSettings";
import { usePasswordChange } from "../../../src/hooks/usePasswordChange";
import { useDeleteAccount } from "../../../src/hooks/useDeleteAccount";

// --- MOCK firebase/auth ---
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

// --- MOCK HOOKS ---
jest.mock("../src/hooks/useMapSettings");
jest.mock("../src/hooks/usePasswordChange");
jest.mock("../src/hooks/useDeleteAccount");

// --- MOCK CHILD COMPONENTS ---
jest.mock("../src/components/myStatusBar",     () => () => <Text testID="status-bar" />);
jest.mock("../src/components/header",          () => ({ title }) => <Text testID="header">{title}</Text>);
jest.mock("../src/components/Settings/ProfileSection", () => () => <Text testID="profile" />);
jest.mock("../src/components/Settings/OptionsList", () => (props) => (
  <>
    <Text testID="btn-change-pw"    onPress={props.onChangePassword}>Change PW</Text>
    <Text testID="btn-map-settings"  onPress={props.onMapSettings}>Map Settings</Text>
    <Text testID="btn-delete-account" onPress={props.onDeleteAccount}>Delete Account</Text>
  </>
));
jest.mock("../src/components/Settings/MapSettingsModal", () => (props) =>
  props.visible ? (
    <>
      <Text testID="map-modal" />
      <Text testID="map-save"    onPress={props.onSave}>Save Map</Text>
      <Text testID="map-cancel"  onPress={props.onCancel}>Cancel Map</Text>
    </>
  ) : null
);
jest.mock("../src/components/Settings/PasswordModal", () => (props) =>
  props.visible ? (
    <>
      <Text testID="pw-modal" />
      <Text testID="pw-submit"  onPress={props.onSubmit}>Submit PW</Text>
      <Text testID="pw-cancel"  onPress={props.onCancel}>Cancel PW</Text>
    </>
  ) : null
);
jest.mock("../src/components/Settings/DeleteAccountModal", () => (props) =>
  props.visible ? (
    <>
      <Text testID="del-modal" />
      <Text testID="del-confirm" onPress={props.onDelete}>Confirm Delete</Text>
      <Text testID="del-cancel"  onPress={props.onCancel}>Cancel Delete</Text>
    </>
  ) : null
);

describe("Settings screen", () => {
  const mockUser = { uid: "abc123" };

  beforeEach(() => {
    // auth.currentUser
    getAuth.mockReturnValue({ currentUser: mockUser });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("shows loading indicator while map settings are loading", () => {
    useMapSettings.mockReturnValue({ loading: true });
    const tree = render(<Settings navigation={{ navigate: jest.fn() }} />);
    expect(tree.getByTestId("status-bar")).toBeTruthy();
    expect(tree.queryByTestId("header")).toBeNull();
    expect(tree.getByTestId("status-bar")).toBeTruthy();
    // ActivityIndicator is the only child of the loading View
    expect(tree.UNSAFE_getByType("ActivityIndicator")).toBeTruthy();
  });

  it("renders main UI and toggles modals correctly", async () => {
    // --- hook mocks ---
    const fakeMap = {
      loading: false,
      radius: 5,
      stops: 3,
      populateRadius: jest.fn(),
      populateStops: jest.fn(),
      setRadius: jest.fn(),
      setStops: jest.fn(),
      handleUpdateMapData: jest.fn().mockResolvedValue(true),
    };
    useMapSettings.mockReturnValue(fakeMap);

    const fakePw = {
      newPassword: "",
      confirmPassword: "",
      setNewPassword: jest.fn(),
      setConfirmPassword: jest.fn(),
      handlePasswordChange: jest.fn().mockReturnValue(true),
    };
    usePasswordChange.mockReturnValue(fakePw);

    const fakeDelete = { handleDeleteAccount: jest.fn() };
    useDeleteAccount.mockReturnValue(fakeDelete);

    const { getByTestId, queryByTestId } = render(
      <Settings navigation={{ navigate: jest.fn() }} />
    );

    // main UI shows
    expect(getByTestId("header").props.children).toBe("Nustatymai");
    expect(getByTestId("profile")).toBeTruthy();

    // Initially, no modals visible
    expect(queryByTestId("map-modal")).toBeNull();
    expect(queryByTestId("pw-modal")).toBeNull();
    expect(queryByTestId("del-modal")).toBeNull();

    // 1) Open Password Modal
    fireEvent.press(getByTestId("btn-change-pw"));
    expect(getByTestId("pw-modal")).toBeTruthy();

    // Submit password change → closes modal
    await act(async () => {
      fireEvent.press(getByTestId("pw-submit"));
    });
    expect(fakePw.handlePasswordChange).toHaveBeenCalled();
    expect(queryByTestId("pw-modal")).toBeNull();

    // 2) Open Map Settings Modal
    fireEvent.press(getByTestId("btn-map-settings"));
    expect(getByTestId("map-modal")).toBeTruthy();

    // Save map settings → closes modal
    await act(async () => {
      fireEvent.press(getByTestId("map-save"));
      // wait for the async handleUpdateMapData resolution
    });
    expect(fakeMap.handleUpdateMapData).toHaveBeenCalled();
    expect(queryByTestId("map-modal")).toBeNull();

    // 3) Open Delete Account Modal
    fireEvent.press(getByTestId("btn-delete-account"));
    expect(getByTestId("del-modal")).toBeTruthy();

    // Confirm delete → calls hook (modal stays open unless parent closes it)
    fireEvent.press(getByTestId("del-confirm"));
    expect(fakeDelete.handleDeleteAccount).toHaveBeenCalled();

    // Cancel delete → closes modal
    fireEvent.press(getByTestId("del-cancel"));
    expect(queryByTestId("del-modal")).toBeNull();
  });
});
