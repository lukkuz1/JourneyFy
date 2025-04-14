// src/screens/OfferRideScreen.js
import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import { Colors } from "../../../constants/styles";
import LocationInfo from "../../../components/OfferRide/LocationInfo";
import PriceInfo from "../../../components/OfferRide/PriceInfo";
import CarInfo from "../../../components/OfferRide/CarInfo";
import SeatInfo from "../../../components/OfferRide/SeatInfo";
import FacilityInfo from "../../../components/OfferRide/FacilityInfo";
import ContinueButton from "../../../components/OfferRide/ContinueButton";
import CarSelectionSheet from "../../../components/OfferRide/CarSelectionSheet";
import SeatSelectionSheet from "../../../components/OfferRide/SeatSelectionSheet";

const OfferRideScreen = ({ navigation }) => {
  const [showCarSheet, setShowCarSheet] = useState(false);
  const [selectedCar, setSelectedCar] = useState("");
  const [showSeatSheet, setShowSeatSheet] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);

  // List of cars to select from
  const carsList = ["Mercedes-Benz", "Toyota matrix", "Audi A4"];
  // Generate seat numbers from 1 to 8
  const seats = Array(8)
    .fill()
    .map((_, idx) => idx + 1);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title="Kelionės pasiūlymas" navigation={navigation} />
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
        >
          <LocationInfo />
          <PriceInfo />
          <CarInfo
            selectedCar={selectedCar}
            onPress={() => setShowCarSheet(true)}
          />
          <SeatInfo
            selectedSeat={selectedSeat}
            onPress={() => setShowSeatSheet(true)}
          />
          <FacilityInfo />
        </ScrollView>
      </View>
      <ContinueButton
        onPress={() => navigation.navigate("ConfirmPoolingScreen")}
      />

      <CarSelectionSheet
        isVisible={showCarSheet}
        carsList={carsList}
        selectedCar={selectedCar}
        onSelect={(car) => {
          setSelectedCar(car);
          setShowCarSheet(false);
        }}
        onClose={() => setShowCarSheet(false)}
      />

      <SeatSelectionSheet
        isVisible={showSeatSheet}
        seats={seats}
        selectedSeat={selectedSeat}
        onSelect={(seat) => {
          setSelectedSeat(seat);
          setShowSeatSheet(false);
        }}
        onClose={() => setShowSeatSheet(false)}
      />
    </View>
  );
};

export default OfferRideScreen;