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
        setPopulateRadius(data.radius.toString());
        setPopulateStops(data.stops.toString());
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
    if (!currentUserId) {
      Alert.alert("Error", "User not logged in");
      return false;
    }
    try {
      await setDoc(doc(db, "map_data", currentUserId), {
        radius: parseFloat(radius),
        stops: parseInt(stops),
      });
      fetchMapData();
      Alert.alert("Success", "Map data updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating map data:", error);
      Alert.alert("Error", "Failed to update map data");
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
