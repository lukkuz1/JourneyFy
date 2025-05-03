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
  increment,
  getDoc,
} from "firebase/firestore";

export default function RideDetailScreen({ navigation, route }) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // keep ride in state so we can mutate passengers and seats
  const [rideState, setRideState] = useState(route.params?.ride || {});
  const driver = useDriver(rideState.userId);
  const user = firebase.auth.currentUser;

  // passenger cancels their registration
  const handleCancelConfirm = async () => {
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
      // fetch the registration to see if it was approved
      const regSnap = await getDoc(regRef);
      const wasApproved =
        regSnap.exists() && regSnap.data().approvedByRider === true;

      // delete the registration record
      await deleteDoc(regRef);

      // build update object
      const updateData = { passengers: arrayRemove(user.uid) };
      if (wasApproved) {
        updateData.seats = increment(1);
      }

      // apply update
      await updateDoc(journeyRef, updateData);

      // update local state
      setRideState((r) => ({
        ...r,
        passengers: (r.passengers || []).filter((uid) => uid !== user.uid),
        seats: wasApproved ? (r.seats || 0) + 1 : r.seats,
      }));

      Alert.alert("Jūsų registracija atšaukta");
    } catch (err) {
      console.error("Cancel error:", err);
      Alert.alert("Klaida atšaukiant registraciją", err.message);
    }

    setShowCancelDialog(false);
    navigation.goBack();
  };

  // driver deletes entire journey
  const handleDeleteConfirm = async () => {
    const journeyRef = doc(firebase.db, "journeys", rideState.id);
    try {
      await deleteDoc(journeyRef);
      Alert.alert("Kelionė pašalinta");
      navigation.popToTop();
    } catch (err) {
      console.error("Delete journey error:", err);
      Alert.alert("Klaida trinant kelionę", err.message);
    }
    setShowDeleteDialog(false);
  };

  // passenger registers for ride (unchanged)
  const handleRegister = async () => {
    if (!user) return navigation.navigate("Login");
    if ((rideState.seats ?? 0) < 1) {
      Alert.alert("Kelionė pilna", "Šioje kelionėje nebėra laisvų vietų.");
      return;
    }
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
      await updateDoc(journeyRef, { passengers: arrayUnion(user.uid) });
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
        onDeletePress={() => setShowDeleteDialog(true)}
      />

      {/* passenger unregister confirmation */}
      <CancelRideDialog
        isVisible={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleCancelConfirm}
        title="Atšaukti registraciją"
        description="Ar tikrai norite atšaukti savo registraciją į šią kelionę?"
      />

      {/* driver delete journey confirmation */}
      <CancelRideDialog
        isVisible={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteConfirm}
        title="Atšaukti kelionę"
        description="Ar tikrai norite atšaukti visą kelionę?"
      />
    </View>
  );
}

const styles = StyleSheet.create({});