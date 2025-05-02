import React from "react";
import { Text, Alert } from "react-native";
import { render, fireEvent, act } from "@testing-library/react-native";
import EditProfileScreen from "../../../src/screens/TemplateProfile/editProfile/editProfileScreen";
import { getAuth } from "firebase/auth";
import {
  fetchUserProfile,
  initializeUserProfile,
  updateProfileInFirestore,
} from "../../../src/services/firebaseUserService";

jest.mock("firebase/auth", () => ({ getAuth: jest.fn() }));
jest.mock("../../../components/myStatusBar",    () => () => <Text testID="status-bar" />);
jest.mock("../../../components/header",         () => ({ title }) => <Text testID="header">{title}</Text>);
jest.mock("../../../components/Profile/ProfilePicture", () => (props) => (
  <Text testID="profile-pic" onPress={() => props.onProfileUpdated("newUrl")} />
));
jest.mock("../../../components/Profile/ProfileInputField", () => (props) => (
  <Text testID={props.label} onPress={() => props.setter("X")} />
));
jest.mock("../../../components/Profile/UpdateButton", () => (props) => (
  <Text testID="update-btn" onPress={props.onPress}>Update</Text>
));
jest.mock("../../../components/LoadingIndicator", () => () => <Text testID="loading" />);

jest.mock("../../../services/firebaseUserService", () => ({
  fetchUserProfile: jest.fn(),
  initializeUserProfile: jest.fn(),
  updateProfileInFirestore: jest.fn(),
}));

describe("EditProfileScreen", () => {
  let navigation;
  beforeEach(() => {
    navigation = {};
    jest.clearAllMocks();
    // stub auth
    getAuth.mockReturnValue({ currentUser: { uid: "u1", photoURL: "url1" } });
    // make fetchUserProfile call populate immediately
    fetchUserProfile.mockImplementation((uid, pop, init) => {
      pop({ firstName: "A", lastName: "B", phoneNumber: "123", dateOfBirth: null, photoURL: "" });
      return Promise.resolve();
    });
  });

  it("shows loading then form fields", async () => {
    const { getByTestId, queryByTestId } = render(
      <EditProfileScreen navigation={navigation} />
    );
    expect(getByTestId("loading")).toBeTruthy();

    await act(() => Promise.resolve());
    expect(queryByTestId("loading")).toBeNull();

    expect(getByTestId("status-bar")).toBeTruthy();
    expect(getByTestId("header").props.children).toBe("Redaguoti Profilį");
    expect(getByTestId("Vardas")).toBeTruthy();
    expect(getByTestId("Pavardė")).toBeTruthy();
    expect(getByTestId("Telefonas")).toBeTruthy();
  });

  it("alerts if user not authenticated", async () => {
    getAuth.mockReturnValue({ currentUser: null });
    jest.spyOn(Alert, "alert").mockImplementation(() => {});

    await act(async () => {
      const { getByTestId } = render(<EditProfileScreen navigation={navigation} />);
      await act(() => Promise.resolve());
      fireEvent.press(getByTestId("update-btn"));
    });
    expect(Alert.alert).toHaveBeenCalledWith("Error", "User not authenticated.");
  });

  it("alerts validation errors", async () => {
    jest.spyOn(Alert, "alert").mockImplementation(() => {});
    await act(async () => {
      const { getByTestId } = render(<EditProfileScreen navigation={navigation} />);
      await act(() => Promise.resolve());
      // fields have default invalid X, so validation fails
      fireEvent.press(getByTestId("update-btn"));
    });
    expect(Alert.alert).toHaveBeenCalledWith("Validation Error", "Please fix the errors before updating.");
  });

  it("updates profile successfully", async () => {
    updateProfileInFirestore.mockResolvedValue();
    jest.spyOn(Alert, "alert").mockImplementation(() => {});
    // simulate valid fields
    const mockValidateName = jest.fn().mockReturnValue("");
    jest.doMock("../../../components/Profile/ProfileInputField", () => ({
      validateName: mockValidateName,
      validatePhoneNumber: () => "",
      validateDateOfBirth: () => "",
    }));

    await act(async () => {
      const { getByTestId } = render(<EditProfileScreen navigation={navigation} />);
      await act(() => Promise.resolve());
      fireEvent.press(getByTestId("update-btn"));
    });
    expect(updateProfileInFirestore).toHaveBeenCalledWith("u1", expect.objectContaining({
      firstName: expect.any(String),
      lastName: expect.any(String),
      phoneNumber: expect.any(String),
      photoURL: "newUrl",
    }));
    expect(Alert.alert).toHaveBeenCalledWith("Success", "Profile updated successfully!");
  });
});
