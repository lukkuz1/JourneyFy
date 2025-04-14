// src/screens/RidesScreen.js
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors } from "../../constants/styles";
import RidesHeader from "../../components/Rides/RidesHeader";
import NoRidesInfo from "../../components/Rides/NoRidesInfo";
import RidesList from "../../components/Rides/RidesList";

const initialRides = [
  {
    id: "1",
    profile: require("../../assets/images/user/user8.png"),
    name: "Jenny wilsom",
    date: "Today",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
  {
    id: "2",
    profile: require("../../assets/images/user/user3.png"),
    name: "Devon Lane",
    date: "22 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
  {
    id: "3",
    profile: require("../../assets/images/user/user16.png"),
    name: "Leslie Alexander",
    date: "23 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
  {
    id: "4",
    profile: require("../../assets/images/user/user2.png"),
    name: "Guy Hawkins",
    date: "24 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
  {
    id: "5",
    profile: require("../../assets/images/user/user17.png"),
    name: "Savannah Nguyen",
    date: "25 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
];

const RidesScreen = ({ navigation, route }) => {
  const [rides, setRides] = useState(initialRides);

  // When a ride id is passed via route params (e.g., after deletion), filter it out.
  useEffect(() => {
    if (route.params?.id) {
      setRides((prevRides) => prevRides.filter((item) => item.id !== route.params.id));
    }
  }, [route.params?.id]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <RidesHeader navigation={navigation} />
        {rides.length === 0 ? <NoRidesInfo /> : <RidesList rides={rides} navigation={navigation} />}
      </View>
    </View>
  );
};

export default RidesScreen;

// You can add any screen-specific styles below if needed.
const styles = StyleSheet.create({});