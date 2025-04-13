import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import { Colors } from "../../../constants/styles";
import RiderInfo from "../../../components/HistoryRideDetail/RiderInfo";
import RiderDetail from "../../../components/HistoryRideDetail/RiderDetail";
import VehicleInfo from "../../../components/HistoryRideDetail/VehicleInfo";
import RateRideButton from "../../../components/HistoryRideDetail/RateRideButton";
import RateRideDialog from "../../../components/HistoryRideDetail/RateRideDialog";

const HistoryRideDetailScreen = ({ navigation }) => {
  const [showRateDialog, setShowRateDialog] = useState(false);
  const [rating, setRating] = useState(4);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title="Ride detail" navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <RiderInfo />
          <RiderDetail />
          <VehicleInfo />
        </ScrollView>
      </View>
      <RateRideButton onPress={() => setShowRateDialog(true)} />
      <RateRideDialog
        isVisible={showRateDialog}
        onClose={() => setShowRateDialog(false)}
        rating={rating}
        setRating={setRating}
      />
    </View>
  );
};

export default HistoryRideDetailScreen;