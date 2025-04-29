import { useState, useCallback } from "react";
import firebase from "../services/firebase";
import {
  doc,
  collection,
  setDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import { Alert } from "react-native";

export default function useRegistration(rideId, initialPassengers, onPassengersChange, onCloseDialog, onGoBack) {
  const user = firebase.auth.currentUser;
  const userId = user?.uid;
  const [loading, setLoading] = useState(false);
  const isRegistered = initialPassengers.includes(userId);

  const register = useCallback(async () => {
    if (!userId) {
      Alert.alert("Turite prisijungti");
      onGoBack();
      return;
    }
    setLoading(true);
    const journeyRef = doc(firebase.db, "journeys", rideId);
    const regRef = doc(collection(journeyRef, "registered_journeys"), userId);
    try {
      await setDoc(regRef, {
        userId,
        registeredAt: serverTimestamp(),
        approvedByRider: false,
      });
      await updateDoc(journeyRef, {
        passengers: arrayUnion(userId),
      });
      onPassengersChange(prev => [...prev, userId]);
      Alert.alert("Užsiregistravote");
    } catch (e) {
      console.error("Register error:", e);
      Alert.alert("Klaida registruojantis", e.message);
    } finally {
      setLoading(false);
    }
  }, [rideId, userId, onPassengersChange, onGoBack]);

  const cancel = useCallback(async () => {
    if (!userId) {
      onCloseDialog();
      onGoBack();
      return;
    }
    setLoading(true);
    const journeyRef = doc(firebase.db, "journeys", rideId);
    const regRef = doc(collection(journeyRef, "registered_journeys"), userId);
    try {
      await deleteDoc(regRef);
      await updateDoc(journeyRef, {
        passengers: arrayRemove(userId),
      });
      onPassengersChange(prev => prev.filter(id => id !== userId));
      Alert.alert("Registracija atšaukta");
      onCloseDialog();
      onGoBack();
    } catch (e) {
      console.error("Cancel error:", e);
      Alert.alert("Klaida atšaukiant", e.message);
    } finally {
      setLoading(false);
    }
  }, [rideId, userId, onPassengersChange, onCloseDialog, onGoBack]);

  return { isRegistered, loading, register, cancel };
}