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
        where("pickupAddress", "==", pickupAddress),
        where("destinationAddress", "==", destinationAddress),
        where("journeyDateTime", "==", journeyDateTime),
        where("seats", ">=", seats),
        where("journeyType", "==", "offer")
      );

      const snapshot = await getDocs(journeysQuery);
      const journeys = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLoading(false);

      if (journeys.length > 0) {
        Alert.alert(
          "Journeys Found",
          `We found ${journeys.length} matching journey(s).`,
          [{ text: "OK" }]
        );
      } else {
        // Alert.alert(
        //   'No Journeys Found',
        //   'Sorry, no matching journeys were found.',
        //   [{ text: 'OK' }]
        // );
      }

      return journeys;
    } catch (err) {
      console.error("Error fetching matching journeys:", err);
      setError(err);
      setLoading(false);

      Alert.alert(
        "Error",
        "There was an error fetching journeys. Please try again later.",
        [{ text: "OK" }]
      );

      return [];
    }
  };

  return { findMatchingJourneys, loading, error };
};

export default useFindMatchingJourneys;
