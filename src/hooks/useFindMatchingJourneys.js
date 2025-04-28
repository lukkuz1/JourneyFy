import { useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Alert } from "react-native";

const useFindMatchingJourneys = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const db = getFirestore();

  const findMatchingJourneys = async ({
    pickupAddress,
    destinationAddress,
    journeyDateTime,
    seats,
  }) => {
    setLoading(true);
    setError(null);

    try {
      const journeysRef = collection(db, "journeys");
      const journeysQuery = query(
        journeysRef,
        // where("pickupAddress", "==", pickupAddress),
        // where("destinationAddress", "==", destinationAddress),
        // where("journeyDateTime", "==", journeyDateTime),
        // where("seats", ">=", seats),
        where("journeyType", "==", "offer"),
        where("status", "==", "pending")
      );

      const snapshot = await getDocs(journeysQuery);
      const journeys = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLoading(false);

      if (journeys.length > 0) {
        Alert.alert(
          "Rastos kelionės",
          `Radome ${journeys.length} atitinkančią kelionę (-es).`,
          [{ text: "Gerai" }]
        );
      } else {
        Alert.alert(
          'Nerasta jokių kelionių',
          'Atsiprašome, bet jokių kelionių atitinkančių kriterijus nebuvo rasta',
          [{ text: 'OK' }]
        );
      }

      return journeys;
    } catch (err) {
      console.error("Error fetching matching journeys:", err);
      setError(err);
      setLoading(false);

      Alert.alert(
        "Klaida",
        "Gaunant keliones įvyko klaida. Bandykite dar kartą vėliau.",
        [{ text: "Gerai" }]
      );

      return [];
    }
  };

  return { findMatchingJourneys, loading, error };
};

export default useFindMatchingJourneys;
