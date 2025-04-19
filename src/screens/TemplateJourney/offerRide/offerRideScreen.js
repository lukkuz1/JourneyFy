import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
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
import useCreateJourney from "../../../hooks/useCreateJourney";
import { useFetchVehicles } from "../../../hooks/useFetchVehicles";

const OfferRideScreen = ({ navigation }) => {
  const route = useRoute();
  const {
    journeyId: existingJourneyId,
    pickupAddress: initPickup,
    destinationAddress: initDestination,
    journeyDateTime: initDateTime,
    seats: initSeats,
    journeyType: initType,
    price: initPrice,
    facilities: initFacilities,
  } = route.params || {};

  // form state
  const [pickupAddress, setPickupAddress]     = useState(initPickup || "");
  const [destinationAddress, setDestination]   = useState(initDestination || "");
  const [journeyDateTime, setJourneyDateTime]  = useState(initDateTime || null);
  const [selectedCar, setSelectedCar]          = useState("");
  const [showCarSheet, setShowCarSheet]        = useState(false);
  const [selectedSeat, setSelectedSeat]        = useState(initSeats || null);
  const [showSeatSheet, setShowSeatSheet]      = useState(false);
  const [price, setPrice]                      = useState(initPrice != null ? String(initPrice) : "");
  const [facilities, setFacilities]            = useState(initFacilities || "");
  const [journeyType, setJourneyType]          = useState(initType || "offer");

  const { createJourney, loading }             = useCreateJourney();

  // fetch user's cars
  const { vehicles, loading: carsLoading }     = useFetchVehicles();
  const carsList = vehicles.map((v) => v.vehicleName);

  const handleContinue = async () => {
    // 1) Price required
    if (price === "") {
      Alert.alert("Trūksta kainos", "Prašome įvesti kainą už vietą.");
      return;
    }
    // 2) Car required
    if (!selectedCar) {
      Alert.alert("Trūksta automobilio", "Prašome pasirinkti savo automobilį.");
      return;
    }
    // 3) Other required fields
    if (
      !pickupAddress ||
      !destinationAddress ||
      !journeyDateTime ||
      !selectedSeat
    ) {
      Alert.alert("Trūksta informacijos", "Prašome užpildyti visus laukus.");
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      Alert.alert("Neteisinga kaina", "Įveskite galiojančią kainą.");
      return;
    }

    const id = await createJourney({
      pickupAddress,
      destinationAddress,
      journeyDateTime,
      seats: selectedSeat,
      journeyType,
      car: selectedCar,
      price: numericPrice,
      facilities,
      journeyId: existingJourneyId,
    });
    if (id) {
      navigation.navigate("ConfirmPoolingScreen", { journeyId: id });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title="Kelionės pasiūlymas" navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets
        >
          <LocationInfo
            pickupAddress={pickupAddress}
            destinationAddress={destinationAddress}
            onPickupChange={setPickupAddress}
            onDestinationChange={setDestination}
          />
          <PriceInfo
            price={price}
            onPriceChange={setPrice}
          />
          <CarInfo
            selectedCar={selectedCar}
            onPress={() => setShowCarSheet(true)}
          />
          <SeatInfo
            selectedSeat={selectedSeat}
            onPress={() => setShowSeatSheet(true)}
          />
          <FacilityInfo
            facilities={facilities}
            onFacilitiesChange={setFacilities}
          />
        </ScrollView>
      </View>

      <ContinueButton onPress={handleContinue} disabled={loading} />

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
        seats={Array.from({ length: 8 }, (_, i) => i + 1)}
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