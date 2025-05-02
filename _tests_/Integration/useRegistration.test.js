// __tests__/useRegistration.test.js
import { renderHook, act } from "@testing-library/react-hooks";
import { Alert } from "react-native";
import useRegistration from "../../src/hooks/useRegistration";
import * as auth from "firebase/auth";
import * as firestore from "firebase/firestore";

jest.mock("firebase/auth");
jest.mock("firebase/firestore");
jest.spyOn(Alert, "alert").mockImplementation(() => {});

describe("useRegistration", () => {
  const rideId = "ride1";
  let onPassengersChange, onCloseDialog, onGoBack;

  beforeEach(() => {
    jest.clearAllMocks();
    auth.getAuth.mockReturnValue({ currentUser: { uid: "u6" } });
    firestore.setDoc = jest.fn().mockResolvedValue();
    firestore.updateDoc = jest.fn().mockResolvedValue();
    firestore.deleteDoc = jest.fn().mockResolvedValue();
    onPassengersChange = jest.fn();
    onCloseDialog = jest.fn();
    onGoBack = jest.fn();
  });

  it("registers user", async () => {
    const { result } = renderHook(() =>
      useRegistration(rideId, [], onPassengersChange, onCloseDialog, onGoBack)
    );
    await act(() => result.current.register());
    expect(Alert.alert).toHaveBeenCalledWith("Užsiregistravote");
    expect(onPassengersChange).toHaveBeenCalled();
  });

  it("cancels registration", async () => {
    const { result } = renderHook(() =>
      useRegistration(rideId, ["u6"], onPassengersChange, onCloseDialog, onGoBack)
    );
    await act(() => result.current.cancel());
    expect(Alert.alert).toHaveBeenCalledWith("Registracija atšaukta");
    expect(onCloseDialog).toHaveBeenCalled();
    expect(onGoBack).toHaveBeenCalled();
  });
});
