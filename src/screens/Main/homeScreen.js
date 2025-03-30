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
import { Colors, Sizes } from "../../constants/styles";

const HomeScreen = ({ navigation, route }) => {
  const auth = getAuth();
  const { createJourney } = useCreateJourney();
  const { findMatchingJourneys } = useFindMatchingJourneys();

  const [pickupAddress, setPickupAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [pickAlert, setPickAlert] = useState(false);
  const [selectedTabIndex, setselectedTabIndex] = useState(1);
  const [selectedDateAndTime, setselectedDateAndTime] = useState("");
  const [selectedDate, setselectedDate] = useState("");
  const [defaultDate, setdefaultDate] = useState(new Date().getDate());
  const [selectedHour, setselectedHour] = useState(new Date().getHours());
  const [selectedMinute, setselectedMinute] = useState(new Date().getMinutes());
  const [selectedAmPm, setselectedAmPm] = useState(new Date().toLocaleTimeString().slice(-2));
  const [showDateTimeSheet, setshowDateTimeSheet] = useState(false);
  const [showNoOfSeatSheet, setshowNoOfSeatSheet] = useState(false);
  const [selectedSeat, setselectedSeat] = useState();

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
    setselectedDateAndTime(dateTime);
  };

  const handleSubmit = async () => {
    if (pickupAddress && destinationAddress && selectedDateAndTime) {
      if (selectedTabIndex === 1) {
        // FIND journey logic (search existing journeys)
        const matchingJourneys = await findMatchingJourneys({
          pickupAddress,
          destinationAddress,
          journeyDateTime: selectedDateAndTime,
          seats: selectedSeat || 1,
        });
        if (matchingJourneys.length > 0) {
          navigation.navigate("AvailableRidesScreen", { journeys: matchingJourneys });
        } else {
          navigation.navigate("AvailableRidesScreen", { journeys: matchingJourneys });
          setPickAlert(true);
          setTimeout(() => setPickAlert(false), 2000);
        }
      } else if (selectedTabIndex === 2) {
        // OFFER journey logic (create new journey)
        const journeyId = await createJourney({
          pickupAddress,
          destinationAddress,
          journeyDateTime: selectedDateAndTime,
          seats: selectedSeat || 1,
          journeyType: "offer",
        });
        if (journeyId) {
          navigation.navigate("OfferRideScreen", {});
          // Reset fields after successful creation
          setPickupAddress("");
          setDestinationAddress("");
          setselectedDateAndTime("");
          setselectedSeat(undefined);
          setselectedDate("");
          setselectedHour(new Date().getHours());
          setselectedMinute(new Date().getMinutes());
          setselectedAmPm(new Date().toLocaleTimeString().slice(-2));
        } else {
          setPickAlert(true);
          setTimeout(() => setPickAlert(false), 2000);
        }
      }
    } else {
      setPickAlert(true);
      setTimeout(() => setPickAlert(false), 2000);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header userEmail={auth.currentUser?.email} />
        <MapComponent />
        <RideInfoCard
          selectedTabIndex={selectedTabIndex}
          setselectedTabIndex={setselectedTabIndex}
          navigation={navigation}
          pickupAddress={pickupAddress}
          destinationAddress={destinationAddress}
          selectedDateAndTime={selectedDateAndTime}
          selectedSeat={selectedSeat}
          onDateTimePress={() => setshowDateTimeSheet(true)}
          onSeatPress={() => setshowNoOfSeatSheet(true)}
          onSubmit={handleSubmit}
          pickAlert={pickAlert}
        />
      </View>
      <DateTimePickerSheet
        isVisible={showDateTimeSheet}
        onClose={() => setshowDateTimeSheet(false)}
        selectedDate={selectedDate}
        onSelectDate={setselectedDate}
        defaultDate={defaultDate}
        setDefaultDate={setdefaultDate}
        selectedHour={selectedHour}
        onSelectHour={setselectedHour}
        selectedMinute={selectedMinute}
        onSelectMinute={setselectedMinute}
        selectedAmPm={selectedAmPm}
        onSelectAmPm={setselectedAmPm}
        onConfirm={handleDateTimeConfirm}
        todayDate={todayDate}
      />
      <NoOfSeatSheet
        isVisible={showNoOfSeatSheet}
        onClose={() => setshowNoOfSeatSheet(false)}
        selectedSeat={selectedSeat}
        onSelectSeat={setselectedSeat}
      />
    </View>
  );
};

export default HomeScreen;
