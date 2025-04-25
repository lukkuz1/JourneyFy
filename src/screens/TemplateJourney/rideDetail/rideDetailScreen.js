// src/screens/RideDetailScreen.js
import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import { Colors } from "../../../constants/styles";
import RideDetailHeader from "../../../components/RideDetail/RideDetailHeader";
import RiderInfo from "../../../components/RideDetail/RiderInfo";
import RiderDetail from "../../../components/RideDetail/RiderDetail";
import PassengerDetail from "../../../components/RideDetail/PassengerDetail";
import ReviewInfo from "../../../components/RideDetail/ReviewInfo";
import VehicleInfo from "../../../components/RideDetail/VehicleInfo";
import RideDetailFooter from "../../../components/RideDetail/RideDetailFooter";
import CancelRideDialog from "../../../components/RideDetail/CancelRideDialog";
import useDriver from "../../../hooks/useDriver";

// Firebase modular imports
import firebase from "../../../services/firebase";
import {
  doc,
  collection,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

const RideDetailScreen = ({ navigation, route }) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const ride = route.params?.ride || {};
  const driver = useDriver(ride.userId);

  // Register current user to this ride
  const handleRegister = async () => {
    const user = firebase.auth.currentUser;
    if (!user) {
      // if not signed in, redirect to login
      return navigation.navigate("Login");
    }

    const journeyDoc = doc(firebase.db, "journeys", ride.id);
    const regColl   = collection(journeyDoc, "registered_journeys");
    const regDoc    = doc(regColl, user.uid);

    try {
      // add registration with approvedByRider=false
      await setDoc(regDoc, {
        userId: user.uid,
        registeredAt: serverTimestamp(),
        approvedByRider: false,
      });

      // update parent ride's passengers array
      await updateDoc(journeyDoc, {
        passengers: arrayUnion(user.uid),
      });

      Alert.alert("Sėkmingai užsiregistravote į kelionę");
    } catch (err) {
      console.error("Register error:", err);
      Alert.alert("Klaida registruojantis", err.message);
    }
  };

  const handleCancelConfirm = () => {
    setShowCancelDialog(false);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <RideDetailHeader navigation={navigation} driver={driver} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <RiderInfo driver={driver} ride={ride} />
          <RiderDetail ride={ride} navigation={navigation} />
          <PassengerDetail passengers={ride.passengers} />
          <ReviewInfo ride={ride} navigation={navigation} />
          <VehicleInfo ride={ride} />
        </ScrollView>
      </View>

      <RideDetailFooter
        ride={ride}
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