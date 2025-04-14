// src/components/DirectionInfo.js
import React from "react";
import { Image, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Sizes, screenWidth, screenHeight } from "../../constants/styles";
import { Key } from "../../constants/key";

const routesList = [
  {
    id: "1",
    title: "Ride start",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.573856, longitude: 88.243163 },
    isPickDropPoint: false,
  },
  {
    id: "2",
    title: "Pick up cameron willimson",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.573856, longitude: 88.293163 },
    isPickDropPoint: true,
  },
  {
    id: "3",
    title: "Pick up brooklyn simmons",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.573856, longitude: 88.323163 },
    isPickDropPoint: true,
  },
  {
    id: "4",
    title: "Drop up cameron willimson",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.603856, longitude: 88.363163 },
    isPickDropPoint: true,
  },
  {
    id: "5",
    title: "Pick up leslie alexander",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.603856, longitude: 88.393163 },
    isPickDropPoint: true,
  },
  {
    id: "6",
    title: "Pick up jacob jones",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.623856, longitude: 88.423163 },
    isPickDropPoint: true,
  },
  {
    id: "7",
    title: "Drive",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.64668, longitude: 88.41377 },
    isPickDropPoint: false,
  },
  {
    id: "8",
    title: "Drop up brooklyn simmons",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.663856, longitude: 88.433163 },
    isPickDropPoint: true,
  },
  {
    id: "9",
    title: "Drop up leslie alexander",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.693856, longitude: 88.433163 },
    isPickDropPoint: true,
  },
  {
    id: "10",
    title: "Drop up jacob jones",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.723856, longitude: 88.403163 },
    isPickDropPoint: true,
  },
  {
    id: "11",
    title: "Ride end",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    coordinate: { latitude: 22.713856, longitude: 88.363163 },
    isPickDropPoint: false,
  },
];

const DirectionInfo = () => {
  return (
    <MapView
      region={{
        latitude: 22.563643,
        longitude: 88.34588,
        latitudeDelta: 0.25,
        longitudeDelta: 0.25,
      }}
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      mapType="terrain"
    >
      {routesList.map((item) => (
        <Marker key={item.id} coordinate={item.coordinate}>
          {item.isPickDropPoint ? (
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 1.5,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.whiteColor,
                borderColor: Colors.greenColor,
              }}
            >
              <MaterialIcons name="location-pin" color={Colors.greenColor} size={14} />
            </View>
          ) : (
            <Image
              source={require("../../assets/images/icons/car.png")}
              style={{ width: 20, height: 20, resizeMode: "contain" }}
            />
          )}
        </Marker>
      ))}
      {routesList.map((item, index) =>
        index !== routesList.length - 1 ? (
          <MapViewDirections
            key={item.id}
            origin={item.coordinate}
            destination={routesList[index + 1].coordinate}
            apikey={Key.apiKey}
            strokeColor={Colors.primaryColor}
            strokeWidth={3}
          />
        ) : null
      )}
    </MapView>
  );
};

export default DirectionInfo;
