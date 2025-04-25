// src/screens/RidesScreen.js
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors } from "../../constants/styles";
import RidesHeader from "../../components/Rides/RidesHeader";
import NoRidesInfo from "../../components/Rides/NoRidesInfo";
import RidesList from "../../components/Rides/RidesList";

import firebase from "../../services/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

const RidesScreen = ({ navigation }) => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const user = firebase.auth.currentUser;
    if (!user) {
      // not signed in
      return;
    }

    const journeysRef = collection(firebase.db, "journeys");
    const q = query(
      journeysRef,
      where("passengers", "array-contains", user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const data = snapshot.docs.map(doc => {
          const d = doc.data();
          let date = "";
          let time = "";
          if (d.departureTime?.toDate) {
            const dt = d.departureTime.toDate();
            date = dt.toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            time = dt.toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
            });
          }

          return {
            id: doc.id,
            profile: d.driverPhotoUrl
              ? { uri: d.driverPhotoUrl }
              : require("../../assets/images/user/user1.jpeg"),
            name: d.driverName || "Vairuotojas",
            date: date || d.date || "",
            time: time || d.time || "",
            pickup: d.pickupLocation || "",
            drop: d.dropoffLocation || "",
          };
        });
        setRides(data);
      },
      error => {
        console.error("Rides subscription error:", error);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <View style={styles.screen}>
      <MyStatusBar />
      <View style={styles.content}>
        <RidesHeader navigation={navigation} />
        {rides.length === 0 ? (
          <NoRidesInfo />
        ) : (
          <RidesList rides={rides} navigation={navigation} />
        )}
      </View>
    </View>
  );
};

export default RidesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bodyBackColor,
  },
  content: {
    flex: 1,
  },
});