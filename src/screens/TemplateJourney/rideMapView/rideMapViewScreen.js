import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import { Colors } from "../../../constants/styles";
import DirectionMap from "../../../components/RideMapView/DirectionMap";
import RideInfoSheet from "../../../components/RideMapView/RideInfoSheet";

const RideMapViewScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title="Žemėlapio peržiūra" navigation={navigation} />
        <DirectionMap />
        <RideInfoSheet />
      </View>
    </View>
  );
};

export default RideMapViewScreen;
