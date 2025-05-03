import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import { Colors } from "../../../constants/styles";
import RidesHeader from "../../../components/RideHistory/RidesHeader";
import RideHistoryList from "../../../components/RideHistory/RideHistoryList";
import EmptyRideList from "../../../components/RideHistory/EmptyRideList";

import firebase from "../../../services/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";

export default function RideHistoryScreen({ navigation }) {
  const [driverRides, setDriverRides] = useState([]);
  const [passengerRides, setPassengerRides] = useState([]);

  const fetchUserProfile = async (userId) => {
    try {
      const snap = await getDoc(doc(firebase.db, "users", userId));
      if (snap.exists()) {
        const { firstName, lastName, photoURL } = snap.data();
        return {
          name: `${firstName} ${lastName}`,
          profile: photoURL
            ? { uri: photoURL }
            : require("../../../assets/images/user/user1.jpeg"),
        };
      }
    } catch {}
    return {
      name: "Vairuotojas",
      profile: require("../../../assets/images/user/user1.jpeg"),
    };
  };

  const formatDateTime = (raw) => {
    if (raw.journeyDateTime) {
      const [d, t] = raw.journeyDateTime.split(" ");
      return { date: d, time: t || "" };
    }
    if (raw.createdAt?.toDate) {
      const dt = raw.createdAt.toDate();
      return {
        date: dt.toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        time: dt.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    }
    return { date: "", time: "" };
  };

  const mapJourney = async (docSnap) => {
    const raw = docSnap.data();
    const { name, profile } = await fetchUserProfile(raw.userId);
    const { date, time } = formatDateTime(raw);

    return {
      id: docSnap.id,
      __raw: raw,
      name,
      profile,
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
  };

  const subscribeToRides = useCallback(
    (filters, setter) => {
      const q = query(
        collection(firebase.db, "journeys"),
        ...filters,
        orderBy("createdAt", "desc")
      );
      return onSnapshot(q, async (snap) => {
        const arr = await Promise.all(snap.docs.map(mapJourney));
        setter(arr);
      });
    },
    [mapJourney]
  );

  useEffect(() => {
    const user = firebase.auth.currentUser;
    if (!user) return;

    const unsubDriver = subscribeToRides(
      [where("userId", "==", user.uid), where("status", "==", "finished")],
      setDriverRides
    );
    const unsubPassenger = subscribeToRides(
      [
        where("passengers", "array-contains", user.uid),
        where("status", "==", "finished"),
      ],
      setPassengerRides
    );

    return () => {
      unsubDriver();
      unsubPassenger();
    };
  }, [subscribeToRides]);

  const allRides = [
    ...driverRides,
    ...passengerRides.filter((p) => !driverRides.some((d) => d.id === p.id)),
  ];

  return (
    <View style={styles.container}>
      <MyStatusBar />
      <View style={styles.content}>
        <RidesHeader navigation={navigation} />
        {allRides.length === 0 ? (
          <EmptyRideList />
        ) : (
          <RideHistoryList rides={allRides} navigation={navigation} />
        )}
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
