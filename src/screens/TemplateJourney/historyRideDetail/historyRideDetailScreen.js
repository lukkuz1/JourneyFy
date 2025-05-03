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

import firebase from "../../../services/firebase";

const HistoryRideDetailScreen = ({ navigation, route }) => {
  const { ride } = route.params;
  const [showRateDialog, setShowRateDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const user = firebase.auth.currentUser;
  const canRate = user && user.uid !== ride.userId;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title="Kelionės aprašymas" navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <RiderInfo ride={ride} />
          <RiderDetail ride={ride} />
          <VehicleInfo ride={ride} />
        </ScrollView>
      </View>

      {canRate && (
        <>
          <RateRideButton onPress={() => setShowRateDialog(true)} />
          <RateRideDialog
            isVisible={showRateDialog}
            onClose={() => setShowRateDialog(false)}
            rating={rating}
            setRating={setRating}
            reviewText={reviewText}
            setReviewText={setReviewText}
            ride={ride}
          />
        </>
      )}
    </View>
  );
};

export default HistoryRideDetailScreen;
