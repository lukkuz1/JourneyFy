import React, { useState, useEffect } from "react";
import { View } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import { Colors } from "../../../constants/styles";
import DirectionInfo from "../../../components/StartRide/DirectionInfo";
import RideInfoSheet from "../../../components/StartRide/RideInfoSheet";
import StartRideButton from "../../../components/StartRide/StartRideButton";

import firebase from "../../../services/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";

const StartRideScreen = ({ navigation, route }) => {
  const { ride } = route.params;
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    if (!ride?.id) return;

    const regRef = collection(
      firebase.db,
      "journeys",
      ride.id,
      "registered_journeys"
    );
    const q = query(regRef, where("approvedByRider", "==", true));

    const unsubscribe = onSnapshot(q, async (snap) => {
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
          // fallback placeholder
          return {
            id: userId,
            firstName: "Keleivis",
            lastName: "",
            photoURL: null,
          };
        })
      );
      setPassengers(results);
    });

    return unsubscribe;
  }, [ride?.id]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title="Kelionės pradžia" navigation={navigation} />
        <DirectionInfo ride={ride} />
        <RideInfoSheet ride={ride} passengers={passengers} />
        <StartRideButton navigation={navigation} ride={ride} />
      </View>
    </View>
  );
};

export default StartRideScreen;