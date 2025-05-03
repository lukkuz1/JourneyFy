import React, { useEffect, useState } from "react";
import { View } from "react-native";
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

const mapJourney = async (docSnap) => {
  const d = docSnap.data();
  let profile, name;
  try {
    const userSnap = await getDoc(doc(firebase.db, "users", d.userId));
    if (userSnap.exists()) {
      const drv = userSnap.data();
      profile = drv.photoURL
        ? { uri: drv.photoURL }
        : require("../../../assets/images/user/user1.jpeg");
      name = `${drv.firstName} ${drv.lastName}`;
    } else throw new Error();
  } catch {
    profile = require("../../../assets/images/user/user1.jpeg");
    name = "Vairuotojas";
  }
  let date = "",
    time = "";
  if (d.journeyDateTime) {
    const [dPart, tPart] = d.journeyDateTime.split(" ");
    date = dPart;
    time = tPart || "";
  } else if (d.createdAt?.toDate) {
    const dt = d.createdAt.toDate();
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

const RideHistoryScreen = ({ navigation }) => {
  const [driverRides, setDriverRides] = useState([]);
  const [passengerRides, setPassengerRides] = useState([]);

  useEffect(() => {
    const user = firebase.auth.currentUser;
    if (!user) return;

    const journeysRef = collection(firebase.db, "journeys");

    const qDriver = query(
      journeysRef,
      where("userId", "==", user.uid),
      where("status", "==", "finished"),
      orderBy("createdAt", "desc")
    );
    const unsubDriver = onSnapshot(qDriver, async (snap) => {
      const arr = await Promise.all(snap.docs.map(mapJourney));
      setDriverRides(arr);
    });

    const qPassenger = query(
      journeysRef,
      where("passengers", "array-contains", user.uid),
      where("status", "==", "finished"),
      orderBy("createdAt", "desc")
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

  const allRides = [
    ...driverRides,
    ...passengerRides.filter((p) => !driverRides.find((d) => d.id === p.id)),
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <RidesHeader navigation={navigation} />
        {allRides.length === 0 ? (
          <EmptyRideList />
        ) : (
          <RideHistoryList rides={allRides} navigation={navigation} />
        )}
      </View>
    </View>
  );
};

export default RideHistoryScreen;
