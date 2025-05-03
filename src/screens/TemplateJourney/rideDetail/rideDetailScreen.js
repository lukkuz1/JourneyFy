import React, { useState } from "react";
import { View, ScrollView, Alert, StyleSheet } from "react-native";
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
  const { ride: initialRide = {} } = route.params || {};
  const [rideState, setRideState] = useState(initialRide);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const driver = useDriver(rideState.userId);
  const user = firebase.auth.currentUser;

  const removeRegistration = async () => {
    if (!user) {
      setShowCancelDialog(false);
      return navigation.goBack();
    }

    const journeyRef = doc(firebase.db, "journeys", rideState.id);
    const regRef = doc(collection(journeyRef, "registered_journeys"), user.uid);

    try {
      const regSnap = await getDoc(regRef);
      const wasApproved = regSnap.exists() && regSnap.data().approvedByRider;

      await deleteDoc(regRef);
      await updateDoc(journeyRef, {
        passengers: arrayRemove(user.uid),
        ...(wasApproved && { seats: increment(1) }),
      });

      setRideState((r) => ({
        ...r,
        passengers: (r.passengers || []).filter((id) => id !== user.uid),
        seats: wasApproved ? (r.seats || 0) + 1 : r.seats,
      }));

      Alert.alert("Jūsų registracija atšaukta");
    } catch (err) {
      console.error("Cancel error:", err);
      Alert.alert("Klaida atšaukiant registraciją", err.message);
    } finally {
      setShowCancelDialog(false);
      navigation.goBack();
    }
  };

  const deleteJourney = async () => {
    const journeyRef = doc(firebase.db, "journeys", rideState.id);

    try {
      await deleteDoc(journeyRef);
      Alert.alert("Kelionė pašalinta");
      navigation.popToTop();
    } catch (err) {
      console.error("Delete journey error:", err);
      Alert.alert("Klaida trinant kelionę", err.message);
    } finally {
      setShowDeleteDialog(false);
    }
  };

  const addRegistration = async () => {
    if (!user) {
      return navigation.navigate("Login");
    }

    if ((rideState.seats ?? 0) < 1) {
      return Alert.alert(
        "Kelionė pilna",
        "Šioje kelionėje nebėra laisvų vietų."
      );
    }

    const journeyRef = doc(firebase.db, "journeys", rideState.id);
    const regRef = doc(collection(journeyRef, "registered_journeys"), user.uid);

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
    <View style={styles.container}>
      <MyStatusBar />
      <View style={styles.content}>
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
        onRegisterPress={addRegistration}
        onDeletePress={() => setShowDeleteDialog(true)}
      />

      <CancelRideDialog
        isVisible={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={removeRegistration}
        title="Atšaukti registraciją"
        description="Ar tikrai norite atšaukti savo registraciją į šią kelionę?"
      />

      <CancelRideDialog
        isVisible={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={deleteJourney}
        title="Atšaukti kelionę"
        description="Ar tikrai norite atšaukti visą kelionę?"
      />
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
