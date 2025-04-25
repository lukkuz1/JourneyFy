// src/screens/RideRequestScreen.js
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
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
  onSnapshot,
  orderBy,
} from "firebase/firestore";

const RideRequestScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [showRequestSheet, setShowRequestSheet] = useState(false);
  const [selectedRequestUsers, setSelectedRequestUsers] = useState([]);

  useEffect(() => {
    const user = firebase.auth.currentUser;
    if (!user) return;

    const journeysRef = collection(firebase.db, "journeys");
    const q = query(
      journeysRef,
      where("userId", "==", user.uid),
      orderBy("departureTime", "desc")
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      // build base array
      const base = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          departureTime: d.departureTime,
          pickup: d.pickupLocation,
          drop: d.dropoffLocation,
          // these will be overwritten once sub-col data arrives
          requestCount: 0,
          passengerList: []
        };
      });

      setRequests(base);

      // subscribe to each ride's registered_journeys
      base.forEach((ride, i) => {
        const regRef = collection(
          firebase.db,
          "journeys",
          ride.id,
          "registered_journeys"
        );
        onSnapshot(regRef, snap => {
          setRequests(prev => {
            const updated = [...prev];
            updated[i] = {
              ...updated[i],
              requestCount: snap.size,
              passengerList: snap.docs.map(d => ({
                id: d.id,
                profile: require("../../../assets/images/user/user1.jpeg"),
                name: d.id,  // replace with actual user name if stored
              }))
            };
            return updated;
          });
        });
      });
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.screen}>
      <MyStatusBar />
      <View style={styles.content}>
        <Header title="Kelionių prašymai" navigation={navigation} />
        <RequestList
          requests={requests}
          onRequestPress={(passengerList) => {
            setSelectedRequestUsers(passengerList);
            setShowRequestSheet(true);
          }}
          navigation={navigation}
        />
      </View>
      <RequestSheet
        isVisible={showRequestSheet}
        requestUsers={selectedRequestUsers}
        count={selectedRequestUsers.length}
        onClose={() => setShowRequestSheet(false)}
      />
    </View>
  );
};

export default RideRequestScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.bodyBackColor },
  content: { flex: 1 },
});