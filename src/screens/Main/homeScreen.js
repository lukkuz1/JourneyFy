import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { getAuth } from "firebase/auth";
import Header from "../../components/Home/Header";
import MapComponent from "../../components/Home/MapComponent";
import RideInfoCard from "../../components/Home/RideInfoCard";
import DateTimePickerSheet from "../../components/Home/DateTimePickerSheet";
import NoOfSeatSheet from "../../components/Home/NoOfSeatSheet";
import MyStatusBar from "../../components/myStatusBar";
import useCreateJourney from "../../hooks/useCreateJourney";
import useFindMatchingJourneys from "../../hooks/useFindMatchingJourneys";
import { Colors } from "../../constants/styles";
import { useLocation } from "../../hooks/useLocation";

const HomeScreen = ({ navigation, route }) => {
  const auth = getAuth();
  const { createJourney } = useCreateJourney();
  const { findMatchingJourneys } = useFindMatchingJourneys();
  const location = useLocation();

  const [pickupAddress, setPickupAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [pickAlert, setPickAlert] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(1);

  // Date & Time picker state
  const [selectedDate, setSelectedDate] = useState("");
  const [defaultDate, setDefaultDate] = useState(new Date().getDate());
  const [selectedHour, setSelectedHour] = useState(new Date().getHours());
  const [selectedMinute, setSelectedMinute] = useState(new Date().getMinutes());
  const [selectedAmPm, setSelectedAmPm] = useState(new Date().toLocaleTimeString().slice(-2));
  const [selectedDateAndTime, setSelectedDateAndTime] = useState("");

  const [showDateTimeSheet, setShowDateTimeSheet] = useState(false);
  const [showNoOfSeatSheet, setShowNoOfSeatSheet] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState();

  // Format today date for picker
  const todayDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;

  useEffect(() => {
    if (route.params?.address) {
      if (route.params.addressFor === "pickup") {
        setPickupAddress(route.params.address);
      } else {
        setDestinationAddress(route.params.address);
      }
    }
  }, [route.params?.address]);

  const handleDateTimeConfirm = (dateTime) => {
    setSelectedDateAndTime(dateTime);
    setShowDateTimeSheet(false);
  };

  const handleSubmit = async () => {
    if (!pickupAddress || !destinationAddress || !selectedDateAndTime) {
      setPickAlert(true);
      setTimeout(() => setPickAlert(false), 2000);
      return;
    }

    if (selectedTabIndex === 1) {
      const matchingJourneys = await findMatchingJourneys({
        pickupAddress,
        destinationAddress,
        journeyDateTime: selectedDateAndTime,
        seats: selectedSeat || 1,
      });
      navigation.navigate("AvailableRidesScreen", { journeys: matchingJourneys });
      if (matchingJourneys.length === 0) {
        setPickAlert(true);
        setTimeout(() => setPickAlert(false), 2000);
      }
    } else if (selectedTabIndex === 2) {
      const journeyId = await createJourney({
        pickupAddress,
        destinationAddress,
        journeyDateTime: selectedDateAndTime,
        seats: selectedSeat || 1,
        journeyType: "offer",
      });
      if (journeyId) {
        navigation.navigate("OfferRideScreen", {
          journeyId,
          pickupAddress,
          destinationAddress,
          journeyDateTime: selectedDateAndTime,
          seats: selectedSeat || 1,
          journeyType: "offer",
        });
        // reset form
        setPickupAddress("");
        setDestinationAddress("");
        setSelectedDateAndTime("");
        setSelectedSeat(undefined);
      } else {
        setPickAlert(true);
        setTimeout(() => setPickAlert(false), 2000);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header location={location} />
        <MapComponent />
        <RideInfoCard
          selectedTabIndex={selectedTabIndex}
          setselectedTabIndex={setSelectedTabIndex}
          navigation={navigation}
          pickupAddress={pickupAddress}
          destinationAddress={destinationAddress}
          selectedDateAndTime={selectedDateAndTime}
          selectedSeat={selectedSeat}
          onDateTimePress={() => setShowDateTimeSheet(true)}
          onSeatPress={() => setShowNoOfSeatSheet(true)}
          onSubmit={handleSubmit}
          pickAlert={pickAlert}
        />
      </View>

      <DateTimePickerSheet
        isVisible={showDateTimeSheet}
        onClose={() => setShowDateTimeSheet(false)}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        defaultDate={defaultDate}
        setDefaultDate={setDefaultDate}
        selectedHour={selectedHour}
        onSelectHour={setSelectedHour}
        selectedMinute={selectedMinute}
        onSelectMinute={setSelectedMinute}
        selectedAmPm={selectedAmPm}
        onSelectAmPm={setSelectedAmPm}
        onConfirm={handleDateTimeConfirm}
        todayDate={todayDate}
      />

      <NoOfSeatSheet
        isVisible={showNoOfSeatSheet}
        onClose={() => setShowNoOfSeatSheet(false)}
        selectedSeat={selectedSeat}
        onSelectSeat={setSelectedSeat}
      />
    </View>
  );
};

export default HomeScreen;