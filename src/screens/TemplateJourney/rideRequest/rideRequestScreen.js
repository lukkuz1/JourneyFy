import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import { Colors } from "../../../constants/styles";
import RequestList from "../../../components/RideRequest/RequestList";
import RequestSheet from "../../../components/RideRequest/RequestSheet";

import firebase from "../../../services/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  increment,
} from "firebase/firestore";

const RideRequestScreen = ({ navigation }) => {
  const [journeys, setJourneys] = useState([]);
  const [showSheet, setShowSheet] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [requestUsers, setRequestUsers] = useState([]);

  useEffect(() => {
    const user = firebase.auth.currentUser;
    if (!user) return;

    const journeysRef = collection(firebase.db, "journeys");
    const q = query(
      journeysRef,
      where("userId", "==", user.uid),
      where("status", "in", ["pending", "started"]),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const base = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          pickup: data.pickupAddress,
          drop: data.destinationAddress,
          createdAt: data.createdAt,
          car: data.car,
          price: data.price,
          seats: data.seats,
          requestCount: 0,
          passengerList: [],
        };
      });
      setJourneys(base);

      base.forEach((ride, idx) => {
        const regRef = collection(
          firebase.db,
          "journeys",
          ride.id,
          "registered_journeys"
        );
        const rq = query(regRef, where("approvedByRider", "==", false));
        onSnapshot(rq, (rsnap) => {
          setJourneys((prev) =>
            prev.map((r, i) =>
              i === idx
                ? {
                    ...r,
                    requestCount: rsnap.size,
                    passengerList: rsnap.docs.map((doc) => ({
                      id: doc.id,
                      ...doc.data(),
                    })),
                  }
                : r
            )
          );
        });
      });
    });

    return unsub;
  }, []);

  const openSheet = (ride) => {
    setSelectedRide(ride);
    setRequestUsers(ride.passengerList || []);
    setShowSheet(true);
  };

  const handleApprove = async (userId) => {
    try {
      const regDocRef = doc(
        firebase.db,
        "journeys",
        selectedRide.id,
        "registered_journeys",
        userId
      );
      await updateDoc(regDocRef, { approvedByRider: true });
      const journeyDocRef = doc(firebase.db, "journeys", selectedRide.id);
      await updateDoc(journeyDocRef, { seats: increment(-1) });
      Alert.alert("Keleivis patvirtintas");
      setRequestUsers((us) => us.filter((u) => u.id !== userId));
    } catch (e) {
      console.error("Approve error:", e);
      Alert.alert("Klaida patvirtinant keleivį", e.message);
    }
  };

  const handleDecline = async (userId) => {
    try {
      const regDocRef = doc(
        firebase.db,
        "journeys",
        selectedRide.id,
        "registered_journeys",
        userId
      );
      await deleteDoc(regDocRef);
      Alert.alert("Registracija atmesta");
      setRequestUsers((us) => us.filter((u) => u.id !== userId));
    } catch (e) {
      console.error("Decline error:", e);
      Alert.alert("Klaida atmetant registraciją", e.message);
    }
  };

  return (
    <View style={styles.screen}>
      <MyStatusBar />
      <View style={styles.content}>
        <Header title="Kelionių prašymai" navigation={navigation} />
        <RequestList
          requests={journeys}
          onRequestPress={openSheet}
          navigation={navigation}
        />
      </View>
      <RequestSheet
        isVisible={showSheet}
        ride={selectedRide}
        requestUsers={requestUsers}
        onApprove={handleApprove}
        onDecline={handleDecline}
        onClose={() => setShowSheet(false)}
      />
    </View>
  );
};

export default RideRequestScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.bodyBackColor },
  content: { flex: 1 },
});
