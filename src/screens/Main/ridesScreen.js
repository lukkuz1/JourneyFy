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

async function fetchUserProfile(userId) {
  try {
    const userDoc = await getDoc(doc(firebase.db, "users", userId));
    if (!userDoc.exists()) throw new Error("No such user");

    const { firstName, lastName, photoURL } = userDoc.data();
    return {
      profile: photoURL
        ? { uri: photoURL }
        : require("../../assets/images/user/user1.jpeg"),
      name: `${firstName} ${lastName}`,
    };
  } catch {
    return {
      profile: require("../../assets/images/user/user1.jpeg"),
      name: "Vairuotojas",
    };
  }
}

function formatDateTime(dateTime = "") {
  const [date = "", time = ""] = dateTime.split(" ");
  return { date, time };
}

async function mapJourney(docSnap) {
  const raw = docSnap.data();
  const { profile, name } = await fetchUserProfile(raw.userId);
  const { date, time } = formatDateTime(raw.journeyDateTime);

  return {
    id: docSnap.id,
    __raw: raw,
    profile,
    name,
    date,
    time,
    pickup: raw.pickupAddress,
    drop: raw.destinationAddress,
    car: raw.car,
    facilities: raw.facilities,
    journeyType: raw.journeyType,
    price: raw.price,
    seats: raw.seats,
    userEmail: raw.userEmail,
  };
}

function subscribeToJourneys(q, setter) {
  return onSnapshot(q, async (snapshot) => {
    const rides = await Promise.all(snapshot.docs.map(mapJourney));
    setter(rides);
  });
}

const RidesScreen = ({ navigation }) => {
  const [driverRides, setDriverRides] = useState([]);
  const [passengerRides, setPassengerRides] = useState([]);

  useEffect(() => {
    const user = firebase.auth.currentUser;
    if (!user) return;

    const driverQuery = query(
      collection(firebase.db, "journeys"),
      where("userId", "==", user.uid),
      where("status", "in", ["pending", "started"])
    );

    const passengerQuery = query(
      collection(firebase.db, "journeys"),
      where("passengers", "array-contains", user.uid),
      where("status", "in", ["pending", "started"])
    );

    const unsubDriver = subscribeToJourneys(driverQuery, setDriverRides);
    const unsubPassenger = subscribeToJourneys(
      passengerQuery,
      setPassengerRides
    );

    return () => {
      unsubDriver();
      unsubPassenger();
    };
  }, []);

  const allRides = [
    ...driverRides,
    ...passengerRides.filter((p) => !driverRides.some((d) => d.id === p.id)),
  ];

  return (
    <View style={styles.screen}>
      <MyStatusBar />
      <View style={styles.content}>
        <RidesHeader navigation={navigation} />
        {allRides.length === 0 ? (
          <NoRidesInfo />
        ) : (
          <RidesList rides={allRides} navigation={navigation} />
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
