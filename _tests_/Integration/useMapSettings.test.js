// __tests__/useMapSettings.test.js
import { renderHook, act } from "@testing-library/react-hooks";
import { Alert } from "react-native";
import { useMapSettings } from "../../src/hooks/useMapSettings";
import * as firestore from "firebase/firestore";

jest.mock("firebase/firestore");
jest.spyOn(Alert, "alert").mockImplementation(() => {});

describe("useMapSettings", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    firestore.getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ radius: 5, stops: 2 }),
    });
  });

  it("fetches and populates data", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useMapSettings("u4")
    );
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.radius).toBe("5");
    expect(result.current.stops).toBe("2");
    expect(result.current.populateRadius).toBe("5");
    expect(result.current.populateStops).toBe("2");
  });

  it("validates and updates map data", async () => {
    firestore.setDoc = jest.fn().mockResolvedValue();
    const { result, waitForNextUpdate } = renderHook(() =>
      useMapSettings("u4")
    );
    await waitForNextUpdate();
    act(() => {
      result.current.setRadius("10");
      result.current.setStops("3");
    });
    const ok = await act(() => result.current.handleUpdateMapData());
    expect(ok).toBe(true);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Sekmės pranešimas",
      "Žemėlapio nustatymai išsaugoti"
    );
  });
});
