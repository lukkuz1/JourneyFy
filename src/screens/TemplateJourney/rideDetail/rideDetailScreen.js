// src/screens/RideDetailScreen.js
import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
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

const RideDetailScreen = ({ navigation, route }) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const ride = route.params?.ride || {};
  const driver = useDriver(ride.userId);

  const handleCancelConfirm = () => {
    setShowCancelDialog(false);
    navigation.navigate("RidesScreen", { id: ride.id });
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

const styles = StyleSheet.create({
});