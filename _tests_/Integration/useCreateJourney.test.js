// __tests__/useCreateJourney.test.js
import { renderHook, act } from "@testing-library/react-hooks";
import { Alert } from "react-native";
import useCreateJourney from "../../src/hooks/useCreateJourney";
import * as firestore from "firebase/firestore";
import * as auth from "firebase/auth";

jest.mock("firebase/firestore");
jest.mock("firebase/auth");
jest.spyOn(Alert, "alert").mockImplementation(() => {});

describe("useCreateJourney", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    auth.getAuth.mockReturnValue({ currentUser: { uid: "u2", email: "a@b" } });
    firestore.serverTimestamp.mockReturnValue("TS");
  });

  it("creates new journey", async () => {
    firestore.addDoc.mockResolvedValue({ id: "j1" });
    const { result } = renderHook(() => useCreateJourney());

    const id = await act(() =>
      result.current.createJourney({
        pickupAddress: "A",
        destinationAddress: "B",
        journeyDateTime: "now",
        seats: 2,
        journeyType: "offer",
        car: "X",
        price: 10,
        facilities: "",
      })
    );

    expect(id).toBe("j1");
    expect(result.current.loading).toBe(false);
  });

  it("updates existing journey", async () => {
    firestore.updateDoc.mockResolvedValue();
    const { result } = renderHook(() => useCreateJourney());

    const id = await act(() =>
      result.current.createJourney({
        journeyId: "j2",
        pickupAddress: "A",
        destinationAddress: "B",
        journeyDateTime: "now",
      })
    );

    expect(id).toBe("j2");
    expect(result.current.loading).toBe(false);
  });

  it("handles errors gracefully", async () => {
    firestore.addDoc.mockRejectedValue(new Error("fail"));
    const { result } = renderHook(() => useCreateJourney());

    const id = await act(() =>
      result.current.createJourney({
        pickupAddress: "A",
        destinationAddress: "B",
        journeyDateTime: "now",
      })
    );

    expect(id).toBeNull();
    expect(result.current.error).toBe("fail");
  });
});
