// __tests__/useRideAndDriver.test.js
import { renderHook } from "@testing-library/react-hooks";
import useRideAndDriver from "../../src/hooks/useRideAndDriver";
import * as firestore from "firebase/firestore";

jest.mock("firebase/firestore");

describe("useRideAndDriver", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    firestore.getDoc
      .mockResolvedValueOnce({ exists: () => true, data: () => ({ foo: "bar", userId: "d1" }) })
      .mockResolvedValueOnce({ exists: () => true, data: () => ({ name: "Driver" }) });
    firestore.doc.mockImplementation((...args) => args);
  });

  it("fetches ride then driver", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useRideAndDriver("ride1")
    );
    await waitForNextUpdate();
    expect(result.current[0]).toEqual({ foo: "bar", userId: "d1" });
    expect(result.current[1]).toEqual({ name: "Driver" });
  });
});
