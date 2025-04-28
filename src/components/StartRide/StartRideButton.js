// src/components/StartRide/StartRideButton.js
import React from "react";
import { TouchableOpacity, Text, View, Alert } from "react-native";
import { Colors, CommonStyles, Fonts, Sizes } from "../../constants/styles";
import firebase from "../../services/firebase";
import { doc, updateDoc } from "firebase/firestore";

const StartRideButton = ({ navigation, ride }) => {
  const handleStart = async () => {
    try {
      const rideRef = doc(firebase.db, "journeys", ride.id);
      await updateDoc(rideRef, { status: "started" });
      Alert.alert("Kelionė pradėta");
      navigation.navigate("EndRideScreen", { rideId: ride.id });
    } catch (e) {
      console.error("Start ride error:", e);
      Alert.alert("Klaida pradedant kelionę", e.message);
    }
  };

  return (
    <View style={{ backgroundColor: Colors.whiteColor }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleStart}
        style={{ ...CommonStyles.button, marginVertical: Sizes.fixPadding * 2 }}
      >
        <Text style={Fonts.whiteColor18Bold}>Pradėti kelionę</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartRideButton;