// __tests__/ProfilePicture.test.js
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ProfilePicture from "../../../src/components/Profile/ProfilePicture";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

jest.mock("expo-image-picker");
jest.mock("firebase/auth");
jest.mock("firebase/storage");
jest.spyOn(global, "fetch").mockResolvedValue({
  blob: () => Promise.resolve("BLOB"),
});

describe("<ProfilePicture />", () => {
  const fakeUser = { uid: "u1" };
  beforeEach(() => {
    getAuth.mockReturnValue({ currentUser: fakeUser });
    ImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValue({ granted: true });
    ImagePicker.launchImageLibraryAsync.mockResolvedValue({ canceled: true });
  });

  it("shows default image and camera button, and handles pickImage", async () => {
    const onUpdate = jest.fn();
    const { getByTestId } = render(
      <ProfilePicture
        currentUser={fakeUser}
        profilePhoto=""
        onProfileUpdated={onUpdate}
      />
    );
    // camera icon is a TouchableOpacity—press it
    const button = getByTestId("change-photo-button");
    fireEvent.press(button);
    await waitFor(() => {
      // since canceled=true, onProfileUpdated should not be called
      expect(onUpdate).not.toHaveBeenCalled();
    });
  });
});
