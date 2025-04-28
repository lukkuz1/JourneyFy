// src/components/EndRide/EndRideButton.js
import React from "react";
import { TouchableOpacity, Text, View, Alert } from "react-native";
import { Colors, CommonStyles, Fonts, Sizes } from "../../constants/styles";
import firebase from "../../services/firebase";
import { doc, updateDoc } from "firebase/firestore";

const EndRideButton = ({ navigation, rideId }) => {
  const handleEnd = async () => {
    try {
      const rideRef = doc(firebase.db, "journeys", rideId);
      await updateDoc(rideRef, { status: "finished" });
      Alert.alert("Kelionė baigta");
      navigation.popToTop();
    } catch (e) {
      console.error("End ride error:", e);
      Alert.alert("Klaida baigiant kelionę", e.message);
    }
  };

  return (
    <View style={{ backgroundColor: Colors.whiteColor }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleEnd}
        style={{ ...CommonStyles.button, marginVertical: Sizes.fixPadding * 2 }}
      >
        <Text style={Fonts.whiteColor18Bold}>Užbaigti kelionę</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EndRideButton;