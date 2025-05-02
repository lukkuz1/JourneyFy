// __tests__/ImagePickerBottomSheet.test.js
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ImagePickerBottomSheet from "../../../src/components/AddVehicle/ImagePickerBottomSheet";
import * as ImagePicker from "expo-image-picker";
import { BottomSheet } from "@rneui/themed";

// stub the BottomSheet to just render children
jest.mock("@rneui/themed", () => ({
  BottomSheet: ({ isVisible, onBackdropPress, children }) =>
    isVisible ? (
      <>{children}</>
    ) : null,
}));

// stub MaterialIcons
jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");

// stub expo-image-picker
jest.mock("expo-image-picker", () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  requestCameraPermissionsAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
  MediaTypeOptions: { Images: "Images" },
}));

describe("ImagePickerBottomSheet", () => {
  const onPickImage = jest.fn();
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title and two options when visible", () => {
    const { getByText } = render(
      <ImagePickerBottomSheet
        isVisible={true}
        onClose={onClose}
        onPickImage={onPickImage}
      />
    );
    expect(getByText("Pridėti nuotrauką")).toBeTruthy();
    expect(getByText("Camera")).toBeTruthy();
    expect(getByText("Gallery")).toBeTruthy();
  });

  it("picks from gallery on success", async () => {
    ImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValue({ granted: true });
    ImagePicker.launchImageLibraryAsync.mockResolvedValue({
      canceled: false,
      assets: [{ uri: "file://pic.png" }],
    });

    const { getByText } = render(
      <ImagePickerBottomSheet
        isVisible={true}
        onClose={onClose}
        onPickImage={onPickImage}
      />
    );

    fireEvent.press(getByText("Gallery"));
    // wait for async
    await waitFor(() => {
      expect(ImagePicker.requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
      expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalledWith({
        mediaTypes: "Images",
        quality: 0.7,
      });
      expect(onPickImage).toHaveBeenCalledWith("file://pic.png");
      expect(onClose).toHaveBeenCalled();
    });
  });

  it("handles camera flow", async () => {
    ImagePicker.requestCameraPermissionsAsync.mockResolvedValue({ granted: true });
    ImagePicker.launchCameraAsync.mockResolvedValue({
      canceled: false,
      assets: [{ uri: "file://cam.jpg" }],
    });

    const { getByText } = render(
      <ImagePickerBottomSheet
        isVisible={true}
        onClose={onClose}
        onPickImage={onPickImage}
      />
    );

    fireEvent.press(getByText("Camera"));
    await waitFor(() => {
      expect(ImagePicker.requestCameraPermissionsAsync).toHaveBeenCalled();
      expect(ImagePicker.launchCameraAsync).toHaveBeenCalledWith({ quality: 0.7 });
      expect(onPickImage).toHaveBeenCalledWith("file://cam.jpg");
      expect(onClose).toHaveBeenCalled();
    });
  });

  it("alerts and closes if permission denied", async () => {
    const alertSpy = jest.spyOn(global, "alert").mockImplementation(() => {});
    ImagePicker.requestCameraPermissionsAsync.mockResolvedValue({ granted: false });

    const { getByText } = render(
      <ImagePickerBottomSheet
        isVisible={true}
        onClose={onClose}
        onPickImage={onPickImage}
      />
    );
    fireEvent.press(getByText("Camera"));
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Permission to access camera is required!");
      expect(onClose).toHaveBeenCalled();
    });
    alertSpy.mockRestore();
  });
});
