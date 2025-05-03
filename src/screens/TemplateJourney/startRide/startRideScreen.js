import React, { useState, useEffect, useCallback } from "react";
import { View, Alert, StyleSheet } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import { Colors } from "../../../constants/styles";
import DirectionInfo from "../../../components/StartRide/DirectionInfo";
import RideInfoSheet from "../../../components/StartRide/RideInfoSheet";
import StartRideButton from "../../../components/StartRide/StartRideButton";
import firebase from "../../../services/firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDoc,
} from "firebase/firestore";

export default function StartRideScreen({ navigation, route }) {
  const initialRide = route.params?.ride ?? {};
  const [rideState, setRideState] = useState(initialRide);
  const [passengers, setPassengers] = useState([]);

  const subscribeToRide = useCallback((rideId) => {
    const rideRef = doc(firebase.db, "journeys", rideId);
    return onSnapshot(
      rideRef,
      (snap) => {
        if (!snap.exists()) return;
        setRideState((prev) => ({ ...prev, ...snap.data() }));
      },
      (err) => console.error("Ride subscription error:", err)
    );
  }, []);

  useEffect(() => {
    if (!initialRide.id) return;
    const unsubscribe = subscribeToRide(initialRide.id);
    return () => unsubscribe();
  }, [initialRide.id, subscribeToRide]);

  useEffect(() => {
    if (rideState.status !== "started") return;

    Alert.alert(
      "Kelionė jau buvo pradėta",
      undefined,
      [{ text: "Gerai", onPress: () => {} }],
      { cancelable: false }
    );
    navigation.replace("EndRideScreen", { rideId: rideState.id });
  }, [rideState.status, navigation, rideState.id]);

  const fetchPassenger = async (userId) => {
    try {
      const userSnap = await getDoc(doc(firebase.db, "users", userId));
      if (userSnap.exists()) {
        return { id: userId, ...userSnap.data() };
      }
    } catch (e) {
      console.error("Error fetching passenger", userId, e);
    }
    return { id: userId, firstName: "Keleivis", lastName: "", photoURL: null };
  };

  const subscribeToPassengers = useCallback((rideId) => {
    const regRef = collection(
      firebase.db,
      "journeys",
      rideId,
      "registered_journeys"
    );
    const q = query(regRef, where("approvedByRider", "==", true));

    return onSnapshot(
      q,
      async (snap) => {
        const list = await Promise.all(
          snap.docs.map((doc) => fetchPassenger(doc.data().userId))
        );
        setPassengers(list);
      },
      (err) => console.error("Passengers subscription error:", err)
    );
  }, []);

  useEffect(() => {
    if (!rideState.id) return;
    const unsubscribe = subscribeToPassengers(rideState.id);
    return () => unsubscribe();
  }, [rideState.id, subscribeToPassengers]);

  return (
    <View style={styles.container}>
      <MyStatusBar />
      <View style={styles.content}>
        <Header title="Kelionės pradžia" navigation={navigation} />
        <DirectionInfo ride={rideState} />
        <RideInfoSheet ride={rideState} passengers={passengers} />
        <StartRideButton navigation={navigation} ride={rideState} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bodyBackColor,
  },
  content: {
    flex: 1,
  },
});
