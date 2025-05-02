// __tests__/useLocation.test.js
import { renderHook } from "@testing-library/react-hooks";
import { useLocation } from "../../src/hooks/useLocation";
import * as Location from "expo-location";

jest.mock("expo-location");

describe("useLocation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Location.requestForegroundPermissionsAsync.mockResolvedValue({ status: "granted" });
    Location.getCurrentPositionAsync.mockResolvedValue({ coords: { latitude:1, longitude:2 } });
    Location.reverseGeocodeAsync.mockResolvedValue([{ country: "Testland" }]);
  });

  it("returns reverse-geocoded country", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useLocation());
    await waitForNextUpdate();
    expect(result.current).toBe("Testland");
  });
});
