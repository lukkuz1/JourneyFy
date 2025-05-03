import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
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

const StartRideScreen = ({ navigation, route }) => {
  const initialRide = route.params?.ride || {};
  const [rideState, setRideState] = useState(initialRide);
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    if (!initialRide.id) return;
    const rideRef = doc(firebase.db, "journeys", initialRide.id);
    const unsubscribeRide = onSnapshot(
      rideRef,
      (snap) => {
        if (!snap.exists()) return;
        setRideState((prev) => ({
          ...prev,
          ...snap.data(),
        }));
      },
      (err) => console.error("Failed to listen to ride doc:", err)
    );
    return () => unsubscribeRide();
  }, [initialRide.id]);

  useEffect(() => {
    if (rideState.status === "started") {
      Alert.alert(
        "Kelionė jau buvo pradėta",
        null,
        [
          { text: "Gerai", onPress: () => {} },
        ],
        { cancelable: false }
      );
      navigation.replace("EndRideScreen", { rideId: rideState.id });
    }
  }, [rideState.status, navigation, rideState.id]);

  useEffect(() => {
    if (!rideState.id) return;
    const regRef = collection(
      firebase.db,
      "journeys",
      rideState.id,
      "registered_journeys"
    );
    const q = query(regRef, where("approvedByRider", "==", true));
    const unsubscribe = onSnapshot(
      q,
      async (snap) => {
        const results = await Promise.all(
          snap.docs.map(async (regDoc) => {
            const { userId } = regDoc.data();
            try {
              const userSnap = await getDoc(
                doc(firebase.db, "users", userId)
              );
              if (userSnap.exists()) {
                return { id: userId, ...userSnap.data() };
              }
            } catch (e) {
              console.error("Error fetching passenger", userId, e);
            }
            return { id: userId, firstName: "Keleivis", lastName: "", photoURL: null };
          })
        );
        setPassengers(results);
      },
      (err) => console.error("Failed to listen to passengers:", err)
    );
    return () => unsubscribe();
  }, [rideState.id]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title="Kelionės pradžia" navigation={navigation} />
        <DirectionInfo ride={rideState} />
        <RideInfoSheet ride={rideState} passengers={passengers} />
        <StartRideButton navigation={navigation} ride={rideState} />
      </View>
    </View>
  );
};

export default StartRideScreen;