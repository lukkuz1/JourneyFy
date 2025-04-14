// src/screens/RideRequestScreen.js
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import { Colors } from "../../../constants/styles";
import RequestList from "../../../components/RideRequest/RequestList";
import RequestSheet from "../../../components/RideRequest/RequestSheet";

// Sample data for individual request users (detailed info in bottom sheet)
const requestUsers = [
  {
    id: "1",
    profile: require("../../../assets/images/user/user3.png"),
    name: "Leslie Alexander",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
    amount: "$13.50",
    seat: 1,
  },
  {
    id: "2",
    profile: require("../../../assets/images/user/user2.png"),
    name: "Albert Flores",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
    amount: "$15.50",
    seat: 1,
  },
  {
    id: "3",
    profile: require("../../../assets/images/user/user15.png"),
    name: "Annette Black",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
    amount: "$10.50",
    seat: 1,
  },
  {
    id: "4",
    profile: require("../../../assets/images/user/user8.png"),
    name: "Guy Hawkins",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
    amount: "$9.50",
    seat: 1,
  },
];

// Sample data for ride requests
const rideRequestsList = [
  {
    id: "1",
    date: "Today",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
    requestCount: 2,
    passengerList: [
      {
        id: "1p",
        profile: require("../../../assets/images/user/user3.png"),
        name: "Savannah Nguyen",
      },
      {
        id: "p2",
        profile: require("../../../assets/images/user/user2.png"),
        name: "Brooklyn Simmons",
      },
      {
        id: "3p",
        profile: require("../../../assets/images/user/user6.png"),
        name: "Savannah Nguyen",
      },
      {
        id: "42",
        profile: require("../../../assets/images/user/user17.png"),
        name: "Brooklyn Simmons",
      },
    ],
  },
  {
    id: "2",
    date: "22 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
    requestCount: 4,
    passengerList: [
      {
        id: "1p",
        profile: require("../../../assets/images/user/user10.png"),
        name: "Savannah Nguyen",
      },
      {
        id: "p2",
        profile: require("../../../assets/images/user/user1.jpeg"),
        name: "Brooklyn Simmons",
      },
    ],
  },
  {
    id: "3",
    date: "23 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
    requestCount: 1,
    passengerList: [
      {
        id: "1p",
        profile: require("../../../assets/images/user/user10.png"),
        name: "Savannah Nguyen",
      },
      {
        id: "p2",
        profile: require("../../../assets/images/user/user1.jpeg"),
        name: "Brooklyn Simmons",
      },
      {
        id: "p3",
        profile: require("../../../assets/images/user/user9.png"),
        name: "Brooklyn Simmons",
      },
    ],
  },
  {
    id: "4",
    date: "24 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
    requestCount: 3,
    passengerList: [
      {
        id: "1p",
        profile: require("../../../assets/images/user/user7.png"),
        name: "Savannah Nguyen",
      },
    ],
  },
  {
    id: "5",
    date: "25 jan 2023",
    time: "9:00 am",
    pickup: "Mumbai,2464 Royal Lnord",
    drop: "Pune, 2464 Royal Ln. Mesa",
    requestCount: 2,
    passengerList: [
      {
        id: "1p",
        profile: require("../../../assets/images/user/user8.png"),
        name: "Savannah Nguyen",
      },
      {
        id: "p2",
        profile: require("../../../assets/images/user/user12.png"),
        name: "Brooklyn Simmons",
      },
      {
        id: "p3",
        profile: require("../../../assets/images/user/user5.png"),
        name: "Brooklyn Simmons",
      },
    ],
  },
];

const RideRequestScreen = ({ navigation }) => {
  const [showRequestSheet, setShowRequestSheet] = useState(false);
  const [selectedRequestCount, setSelectedRequestCount] = useState(null);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title="Kelionių prašymai" navigation={navigation} />
        <RequestList
          requests={rideRequestsList}
          onRequestPress={(requestCount) => {
            setSelectedRequestCount(requestCount);
            setShowRequestSheet(true);
          }}
          navigation={navigation}
        />
      </View>
      <RequestSheet
        isVisible={showRequestSheet}
        requestUsers={requestUsers}
        count={selectedRequestCount}
        onClose={() => setShowRequestSheet(false)}
      />
    </View>
  );
};

export default RideRequestScreen;

const styles = StyleSheet.create({

});