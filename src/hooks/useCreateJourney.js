// src/hooks/useCreateJourney.js
import { useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Alert } from "react-native";

const useCreateJourney = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const db  = getFirestore();
  const auth = getAuth();

  const createJourney = async ({
    pickupAddress,
    destinationAddress,
    journeyDateTime,
    seats = 1,
    journeyType = "offer",
    car = "",
    price = 0,
    facilities = "",
    journeyId,
  }) => {
    setLoading(true);
    setError(null);

    const rawData = {
      userId:      auth.currentUser.uid,
      userEmail:   auth.currentUser.email,
      pickupAddress,
      destinationAddress,
      journeyDateTime,
      seats,
      journeyType,
      car,
      price,
      facilities,
      updatedAt: serverTimestamp(),
      ...(journeyId ? {} : { createdAt: serverTimestamp() }),
    };

    const journeyData = Object.entries(rawData).reduce((acc, [k, v]) => {
      if (v !== undefined) acc[k] = v;
      return acc;
    }, {});

    try {
      let docRefId = journeyId;
      if (journeyId) {
        await updateDoc(doc(db, "journeys", journeyId), journeyData);
      } else {
        const docRef = await addDoc(collection(db, "journeys"), journeyData);
        docRefId = docRef.id;
      }

      setLoading(false);
      Alert.alert(
        "Sekmės pranešimas",
        journeyId ? "Kelionės informacija atnaujinta!" : "Kelionė sėkmingai sukurta!"
      );
      return docRefId;
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