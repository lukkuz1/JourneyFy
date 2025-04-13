// src/screens/RideHistoryScreen.js
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import { Colors } from "../../../constants/styles";
import RidesHeader from "../../../components/RideHistory/RidesHeader";
import RideHistoryList from "../../../components/RideHistory/RideHistoryList";
import EmptyRideList from "../../../components/RideHistory/EmptyRideList";

const ridesListInitial = [
  {
    id: "1",
    profile: require("../../../assets/images/user/user17.png"),
    name: "Savannah Nguyen",
    date: "18 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
  {
    id: "2",
    profile: require("../../../assets/images/user/user16.png"),
    name: "Leslie Alexander",
    date: "18 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
  {
    id: "3",
    profile: require("../../../assets/images/user/user2.png"),
    name: "Guy Hawkins",
    date: "19 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
  {
    id: "4",
    profile: require("../../../assets/images/user/user3.png"),
    name: "Devon Lane",
    date: "20 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
  {
    id: "5",
    profile: require("../../../assets/images/user/user8.png"),
    name: "Jenny wilsom",
    date: "20 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
  {
    id: "6",
    profile: require("../../../assets/images/user/user14.png"),
    name: "Ralph Edwards",
    date: "21 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
  {
    id: "7",
    profile: require("../../../assets/images/user/user13.png"),
    name: "Albert Flores",
    date: "21 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
  {
    id: "8",
    profile: require("../../../assets/images/user/user15.png"),
    name: "Jerome Bell",
    date: "22 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
  },
];

const RideHistoryScreen = ({ navigation, route }) => {
  const [rides, setRides] = useState(ridesListInitial);

  // If route.params?.id exists (for example, after deletion), filter that ride out:
  useEffect(() => {
    if (route.params?.id) {
      setRides((prev) => prev.filter((item) => item.id !== route.params.id));
    }
  }, [route.params?.id]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <RidesHeader navigation={navigation} />
        {rides.length === 0 ? (
          <EmptyRideList />
        ) : (
          <RideHistoryList rides={rides} navigation={navigation} />
        )}
      </View>
    </View>
  );
};

export default RideHistoryScreen;


const styles = StyleSheet.create({});