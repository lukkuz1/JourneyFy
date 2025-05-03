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
  getDoc,
  doc,
} from "firebase/firestore";

const mapJourney = async (docSnap) => {
  const d = docSnap.data();
  let profile, name;
  try {
    const userSnap = await getDoc(doc(firebase.db, "users", d.userId));
    if (userSnap.exists()) {
      const drv = userSnap.data();
      profile = drv.photoURL
        ? { uri: drv.photoURL }
        : require("../../assets/images/user/user1.jpeg");
      name = `${drv.firstName} ${drv.lastName}`;
    } else throw new Error();
  } catch {
    profile = require("../../assets/images/user/user1.jpeg");
    name = "Vairuotojas";
  }

  let date = "",
    time = "";
  if (d.journeyDateTime) {
    const parts = d.journeyDateTime.split(" ");
    date = parts[0];
    time = parts[1] || "";
  }

  return {
    id: docSnap.id,
    __raw: d,
    profile,
    name,
    date,
    time,
    pickup: d.pickupAddress,
    drop: d.destinationAddress,
    car: d.car,
    facilities: d.facilities,
    journeyType: d.journeyType,
    price: d.price,
    seats: d.seats,
    userEmail: d.userEmail,
  };
};

const RidesScreen = ({ navigation }) => {
  const [driverRides, setDriverRides] = useState([]);
  const [passengerRides, setPassengerRides] = useState([]);

  useEffect(() => {
    const user = firebase.auth.currentUser;
    if (!user) return;
    const qDriver = query(
      collection(firebase.db, "journeys"),
      where("userId", "==", user.uid),
      where("status", "in", ["pending", "started"])
    );
    const unsubDriver = onSnapshot(qDriver, async (snap) => {
      const arr = await Promise.all(snap.docs.map(mapJourney));
      setDriverRides(arr);
    });
    const qPassenger = query(
      collection(firebase.db, "journeys"),
      where("passengers", "array-contains", user.uid),
      where("status", "in", ["pending", "started"])
    );
    const unsubPassenger = onSnapshot(qPassenger, async (snap) => {
      const arr = await Promise.all(snap.docs.map(mapJourney));
      setPassengerRides(arr);
    });

    return () => {
      unsubDriver();
      unsubPassenger();
    };
  }, []);

  const all = [
    ...driverRides,
    ...passengerRides.filter((p) => !driverRides.find((d) => d.id === p.id)),
  ];

  return (
    <View style={styles.screen}>
      <MyStatusBar />
      <View style={styles.content}>
        <RidesHeader navigation={navigation} />
        {all.length === 0 ? (
          <NoRidesInfo />
        ) : (
          <RidesList rides={all} navigation={navigation} />
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
