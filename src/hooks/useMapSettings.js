import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import firebase from "../services/firebase";
import { Alert } from "react-native";

const { db } = firebase;

export const useMapSettings = (currentUserId) => {
  const [loading, setLoading] = useState(true);
  const [radius, setRadius] = useState("");
  const [stops, setStops] = useState("");
  const [populateRadius, setPopulateRadius] = useState("");
  const [populateStops, setPopulateStops] = useState("");

  const fetchMapData = async () => {
    try {
      if (!currentUserId) {
        setLoading(false);
        return;
      }
      const mapDoc = await getDoc(doc(db, "map_data", currentUserId));
      if (mapDoc.exists()) {
        const data = mapDoc.data();
        const rStr = data.radius.toString();
        const sStr = data.stops.toString();

        // for backwards compatibility / placeholders
        setPopulateRadius(rStr);
        setPopulateStops(sStr);
        // now actually pre‑fill the inputs
        setRadius(rStr);
        setStops(sStr);
      }
    } catch (error) {
      console.error("Error fetching map data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMapData();
  }, [currentUserId]);

  const handleUpdateMapData = async () => {
    const r = radius.trim();
    const s = stops.trim();

    if (r === "" || isNaN(Number(r)) || Number(r) <= 0) {
      Alert.alert("Klaida", "Įveskite galiojantį spindulį (skaičius didesnis už 0).");
      return false;
    }
    if (s === "" || !/^\d+$/.test(s) || Number(s) < 1) {
      Alert.alert("Klaida", "Įveskite galiojantį maksimalių stotelių skaičių (teigiamas sveikasis skaičius).");
      return false;
    }
    if (!currentUserId) {
      Alert.alert("Klaida", "Naudotojas nėra prisijungęs!");
      return false;
    }

    try {
      await setDoc(doc(db, "map_data", currentUserId), {
        radius: parseFloat(r),
        stops: parseInt(s, 10),
      });
      await fetchMapData();
      Alert.alert("Sekmės pranešimas", "Žemėlapio nustatymai išsaugoti");
      return true;
    } catch (error) {
      console.error("Error updating map data:", error);
      Alert.alert("Klaidos pranešimas", "Nepavyko atnaujinti žemėlapio duomenų");
      return false;
    }
  };

  return {
    loading,
    radius,
    stops,
    populateRadius,
    populateStops,
    setRadius,
    setStops,
    handleUpdateMapData,
  };
};