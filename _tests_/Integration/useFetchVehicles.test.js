// __tests__/useFetchVehicles.test.js
import { renderHook } from "@testing-library/react-hooks";
import { Alert } from "react-native";
import { useFetchVehicles } from "../../src/hooks/useFetchVehicles";
import * as firestore from "firebase/firestore";
import * as auth from "firebase/auth";

jest.mock("firebase/firestore");
jest.mock("firebase/auth");
jest.spyOn(Alert, "alert").mockImplementation(() => {});

describe("useFetchVehicles", () => {
  const fakeSnap = { docs: [{ id: "v1", data: () => ({ seat: 4 }) }] };
  let unsubscribe;

  beforeEach(() => {
    jest.clearAllMocks();
    auth.getAuth.mockReturnValue({ currentUser: { uid: "u3" } });
    unsubscribe = jest.fn();
    firestore.onSnapshot.mockImplementation((_, cb) => {
      cb(fakeSnap);
      return unsubscribe;
    });
  });

  it("subscribes and returns vehicles", async () => {
    const { result, waitForNextUpdate, unmount } = renderHook(() =>
      useFetchVehicles()
    );
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.vehicles).toEqual([{ id: "v1", seat: 4 }]);
    expect(result.current.loading).toBe(false);

    unmount();
    expect(unsubscribe).toHaveBeenCalled();
  });
});
