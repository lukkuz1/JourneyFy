import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const useUserVehicles = () => {
  const db = getFirestore();
  const auth = getAuth();
  const [vehicles, setVehicles] = useState([]);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const vehiclesQuery = query(
      collection(db, "cars"),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      vehiclesQuery,
      (snapshot) => {
        const fetchedVehicles = snapshot.docs.map((docSnapshot) => {
          const data = docSnapshot.data();
          return {
            id: docSnapshot.id,
            image: data.imageUrl,
            name: data.vehicleName,
            capacityOfPerson: data.seat,
            approvedByAdmin: data.approvedByAdmin,
          };
        });
        setVehicles(fetchedVehicles);
      },
      (error) => {
        console.error("Error fetching vehicles: ", error);
      }
    );

    return () => unsubscribe();
  }, [auth.currentUser?.uid, db]);

  const deleteVehicle = async ({ id }) => {
    try {
      await deleteDoc(doc(db, "cars", id));
      setShowSnackBar(true);
    } catch (error) {
      console.error("Error deleting vehicle: ", error);
    }
  };

  const openStatusModal = (approved) => {
    if (approved) {
      setModalMessage("Šis automobilis yra patvirtintas administratoriaus.");
    } else {
      setModalMessage("Šis automobilis dar nėra patvirtintas administratoriaus.");
    }
    setModalVisible(true);
  };

  return {
    vehicles,
    deleteVehicle,
    showSnackBar,
    setShowSnackBar,
    modalVisible,
    setModalVisible,
    modalMessage,
    openStatusModal,
  };
};
