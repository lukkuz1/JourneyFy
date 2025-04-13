// src/screens/StartRideScreen.js
import React from "react";
import { View } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import { Colors } from "../../../constants/styles";
import DirectionInfo from "../../../components/StartRide/DirectionInfo";
import RideInfoSheet from "../../../components/StartRide/RideInfoSheet";
import StartRideButton from "../../../components/StartRide/StartRideButton";

const StartRideScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title="Ride request" navigation={navigation} />
        <DirectionInfo />
        <RideInfoSheet />
        <StartRideButton navigation={navigation} />
      </View>
    </View>
  );
};

export default StartRideScreen;