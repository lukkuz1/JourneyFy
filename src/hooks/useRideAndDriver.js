import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import firebase from "../services/firebase";

export default function useRideAndDriver(rideId) {
  const [ride, setRide] = useState(null);
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    if (!rideId) return;
    const fetch = async () => {
      try {
        const rideSnap = await getDoc(doc(firebase.db, "journeys", rideId));
        if (!rideSnap.exists()) return;
        const rideData = rideSnap.data();
        setRide(rideData);

        const drvSnap = await getDoc(
          doc(firebase.db, "users", rideData.userId)
        );
        if (drvSnap.exists()) setDriver(drvSnap.data());
      } catch (e) {
        console.error("Ride/driver load error:", e);
      }
    };
    fetch();
  }, [rideId]);

  return [ride, driver];
}
