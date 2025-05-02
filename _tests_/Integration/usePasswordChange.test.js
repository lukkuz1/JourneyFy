// __tests__/usePasswordChange.test.js
import { renderHook, act } from "@testing-library/react-hooks";
import { Alert } from "react-native";
import { usePasswordChange } from "../../src/hooks/usePasswordChange";
import * as auth from "firebase/auth";

jest.mock("firebase/auth");
jest.spyOn(Alert, "alert").mockImplementation(() => {});

describe("usePasswordChange", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    auth.getAuth.mockReturnValue({ currentUser: { uid: "u5" } });
  });

  it("rejects when passwords mismatch or too short", async () => {
    const { result } = renderHook(() => usePasswordChange());
    act(() => {
      result.current.setNewPassword("123");
      result.current.setConfirmPassword("456");
    });
    const ok1 = await act(() => result.current.handlePasswordChange());
    expect(ok1).toBe(false);

    act(() => {
      result.current.setNewPassword("123");
      result.current.setConfirmPassword("123");
    });
    const ok2 = await act(() => result.current.handlePasswordChange());
    expect(ok2).toBe(false);
  });

  it("updates successfully", async () => {
    auth.getAuth.mockReturnValue({ currentUser: { uid: "u5" } });
    auth.updatePassword = jest.fn().mockResolvedValue();
    const { result } = renderHook(() => usePasswordChange());

    act(() => {
      result.current.setNewPassword("abcdef");
      result.current.setConfirmPassword("abcdef");
    });
    const ok = await act(() => result.current.handlePasswordChange());
    expect(ok).toBe(true);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Sekmės pranešimas",
      "Slaptažodis pakeistas sėkmingai"
    );
  });
});
