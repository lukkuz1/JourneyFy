// src/screens/EndRideScreen.js
import React from "react";
import { View } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import MapDirection from "../../../components/EndRide/MapDirection";
import RideInfoSheet from "../../../components/EndRide/RideInfoSheet";
import EndRideButton from "../../../components/EndRide/EndRideButton";
import { Colors } from "../../../constants/styles";

// Sample data arrays
const passengersList = [
  {
    id: "1",
    profile: require("../../../assets/images/user/user6.png"),
    name: "Cameron Williamson",
  },
  {
    id: "2",
    profile: require("../../../assets/images/user/user5.png"),
    name: "Brooklyn Simmons",
  },
  {
    id: "3",
    profile: require("../../../assets/images/user/user2.png"),
    name: "leslie alexander",
  },
  {
    id: "4",
    profile: require("../../../assets/images/user/user3.png"),
    name: "Jacob jones",
  },
];

const routesList = [
  {
    id: "1",
    title: "Ride start",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.573856, longitude: 88.243163 },
    isPickDropPoint: false,
    status: "completed",
  },
  {
    id: "2",
    title: "Pick up cameron willimson",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.573856, longitude: 88.293163 },
    isPickDropPoint: true,
    status: "completed",
  },
  {
    id: "3",
    title: "Pick up brooklyn simmons",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.573856, longitude: 88.323163 },
    isPickDropPoint: true,
    status: "completed",
  },
  {
    id: "4",
    title: "Drop up cameron willimson",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.603856, longitude: 88.363163 },
    isPickDropPoint: true,
    status: "completed",
  },
  {
    id: "5",
    title: "Pick up leslie alexander",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.603856, longitude: 88.393163 },
    isPickDropPoint: true,
    status: "completed",
  },
  {
    id: "6",
    title: "Pick up jacob jones",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.623856, longitude: 88.423163 },
    isPickDropPoint: true,
    status: "not-completed",
    isPickPoint: true,
  },
  {
    id: "7",
    title: "Drive",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.64668, longitude: 88.41377 },
    isPickDropPoint: false,
    status: "not-completed",
  },
  {
    id: "8",
    title: "Drop up brooklyn simmons",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.663856, longitude: 88.433163 },
    isPickDropPoint: true,
    status: "not-completed",
    isPickPoint: false,
  },
  {
    id: "9",
    title: "Drop up leslie alexander",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.693856, longitude: 88.433163 },
    isPickDropPoint: true,
    status: "not-completed",
    isPickPoint: false,
  },
  {
    id: "10",
    title: "Drop up jacob jones",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.723856, longitude: 88.403163 },
    isPickDropPoint: true,
    status: "not-completed",
    isPickPoint: false,
  },
  {
    id: "11",
    title: "Ride end",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.713856, longitude: 88.363163 },
    isPickDropPoint: false,
    status: "not-completed",
  },
];

const EndRideScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={"Kelių planas"} navigation={navigation} />
        <MapDirection routesList={routesList} />
        <RideInfoSheet routesList={routesList} passengersList={passengersList} />
        <EndRideButton navigation={navigation} />
      </View>
    </View>
  );
};

export default EndRideScreen;