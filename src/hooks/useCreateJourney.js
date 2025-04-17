import { useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Alert } from "react-native";

const useCreateJourney = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const db = getFirestore();
  const auth = getAuth();

  const createJourney = async ({
    pickupAddress,
    destinationAddress,
    journeyDateTime,
    seats,
    journeyType,
  }) => {
    setLoading(true);
    setError(null);

    try {
      const journeyData = {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        pickupAddress,
        destinationAddress,
        journeyDateTime,
        seats,
        journeyType,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "journeys"), journeyData);
      setLoading(false);

      Alert.alert("Sekmės pranešimas", "Kelionė sėkmingai sukurta!");

      return docRef.id;
    } catch (err) {
      setError(err.message);
      setLoading(false);

      Alert.alert("Klaidos pranešimas", err.message);

      return null;
    }
  };

  return { createJourney, loading, error };
};

export default useCreateJourney;
