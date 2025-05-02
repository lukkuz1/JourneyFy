// __tests__/useAddVehicle.test.js
import { renderHook, act } from "@testing-library/react-hooks";
import { Alert } from "react-native";
import { useAddVehicle } from "../../src/hooks/useAddVehicle";
import * as firestore from "firebase/firestore";
import * as auth from "firebase/auth";
import { uploadImageAsync } from "../../src/utils/uploadImage";

jest.mock("firebase/firestore");
jest.mock("firebase/auth");
jest.mock("../src/utils/uploadImage");
jest.spyOn(Alert, "alert").mockImplementation(() => {});

describe("useAddVehicle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("throws if not logged in", async () => {
    auth.getAuth.mockReturnValue({ currentUser: null });
    const { result } = renderHook(() => useAddVehicle());
    await expect(result.current.addVehicle({})).rejects.toThrow(
      "Naudotojas nėra prisijungęs!"
    );
  });

  it("throws if vehicle already exists", async () => {
    auth.getAuth.mockReturnValue({ currentUser: { uid: "u1" } });
    firestore.getFirestore.mockReturnValue({});
    firestore.getDocs.mockResolvedValue({ empty: false });
    const { result } = renderHook(() => useAddVehicle());
    await expect(
      result.current.addVehicle({ vehicleName: "X" })
    ).rejects.toThrow("Jūsų paskyroje jau yra pridėta mašina.");
    expect(result.current.uploading).toBe(false);
  });

  it("uploads image and adds doc on success", async () => {
    auth.getAuth.mockReturnValue({ currentUser: { uid: "u1" } });
    firestore.getDocs.mockResolvedValue({ empty: true });
    uploadImageAsync.mockResolvedValue("http://img");
    firestore.addDoc.mockResolvedValue({ id: "new" });

    const { result } = renderHook(() => useAddVehicle());
    await act(() =>
      result.current.addVehicle({
        vehicleName: "X",
        vehicleType: "SUV",
        regNo: "123",
        color: "red",
        seat: 4,
        facility: "",
        carImage: "uri",
      })
    );

    expect(uploadImageAsync).toHaveBeenCalledWith("uri");
    expect(firestore.addDoc).toHaveBeenCalled();
    expect(result.current.uploading).toBe(false);
  });
});
