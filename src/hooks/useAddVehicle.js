import { useState } from "react";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { uploadImageAsync } from "../utils/uploadImage";

export const useAddVehicle = () => {
  const [uploading, setUploading] = useState(false);
  const db = getFirestore();
  const auth = getAuth();

  const addVehicle = async (vehicleData) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User not logged in");
    }
    setUploading(true);

    // Check if the user already has a vehicle added
    const vehiclesQuery = query(
      collection(db, "cars"),
      where("userId", "==", currentUser.uid)
    );
    const querySnapshot = await getDocs(vehiclesQuery);
    if (!querySnapshot.empty) {
      setUploading(false);
      throw new Error("Jūsų paskyroje jau yra pridėta mašina.");
    }

    let imageUrl = "";
    if (vehicleData.carImage) {
      imageUrl = await uploadImageAsync(vehicleData.carImage);
    }
    const newVehicle = {
      userId: currentUser.uid,
      vehicleName: vehicleData.vehicleName,
      vehicleType: vehicleData.vehicleType,
      regNo: vehicleData.regNo,
      color: vehicleData.color,
      seat: vehicleData.seat,
      facility: vehicleData.facility,
      imageUrl,
      approvedByAdmin: false,
    };
    await addDoc(collection(db, "cars"), newVehicle);
    setUploading(false);
  };

  return { uploading, addVehicle };
};
