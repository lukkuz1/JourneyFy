// src/screens/RideDetailScreen.js
import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import { Colors } from "../../../constants/styles";
import RideDetailHeader from "../../../components/RideDetail/RideDetailHeader";
import RiderInfo from "../../../components/RideDetail/RiderInfo";
import RiderDetail from "../../../components/RideDetail/RiderDetail";
import PassengerDetail from "../../../components/RideDetail/PassengerDetail";
import VehicleInfo from "../../../components/RideDetail/VehicleInfo";
import RideDetailFooter from "../../../components/RideDetail/RideDetailFooter";
import CancelRideDialog from "../../../components/RideDetail/CancelRideDialog";
import useDriver from "../../../hooks/useDriver";

import firebase from "../../../services/firebase";
import {
  doc,
  collection,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";

const RideDetailScreen = ({ navigation, route }) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  // keep ride in state so we can mutate passengers array
  const [rideState, setRideState] = useState(route.params?.ride || {});
  const driver = useDriver(rideState.userId);

  const handleRegister = async () => {
    const user = firebase.auth.currentUser;
    if (!user) return navigation.navigate("Login");

    const journeyRef = doc(firebase.db, "journeys", rideState.id);
    const regRef = doc(
      collection(journeyRef, "registered_journeys"),
      user.uid
    );

    try {
      await setDoc(regRef, {
        userId: user.uid,
        registeredAt: serverTimestamp(),
        approvedByRider: false,
      });
      await updateDoc(journeyRef, {
        passengers: arrayUnion(user.uid),
      });

      // update local state immediately
      setRideState((r) => ({
        ...r,
        passengers: [...(r.passengers || []), user.uid],
      }));

      Alert.alert("Sėkmingai užsiregistravote į kelionę");
    } catch (err) {
      console.error("Register error:", err);
      Alert.alert("Klaida registruojantis", err.message);
    }
  };

  const handleCancelConfirm = async () => {
    const user = firebase.auth.currentUser;
    if (!user) {
      setShowCancelDialog(false);
      return navigation.goBack();
    }

    const journeyRef = doc(firebase.db, "journeys", rideState.id);
    const regRef = doc(
      collection(journeyRef, "registered_journeys"),
      user.uid
    );

    try {
      await deleteDoc(regRef);
      await updateDoc(journeyRef, {
        passengers: arrayRemove(user.uid),
      });

      // remove from local state
      setRideState((r) => ({
        ...r,
        passengers: (r.passengers || []).filter((uid) => uid !== user.uid),
      }));

      Alert.alert("Jūsų registracija atšaukta");
    } catch (err) {
      console.error("Cancel error:", err);
      Alert.alert("Klaida atšaukiant registraciją", err.message);
    }

    setShowCancelDialog(false);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <RideDetailHeader navigation={navigation} driver={driver} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <RiderInfo driver={driver} ride={rideState} />
          <RiderDetail ride={rideState} navigation={navigation} />
          <PassengerDetail rideId={rideState.id} />
          <VehicleInfo ride={rideState} />
        </ScrollView>
      </View>

      <RideDetailFooter
        ride={rideState}
        navigation={navigation}
        onCancelPress={() => setShowCancelDialog(true)}
        onRegisterPress={handleRegister}
      />

      <CancelRideDialog
        isVisible={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleCancelConfirm}
      />
    </View>
  );
};

export default RideDetailScreen;

const styles = StyleSheet.create({});