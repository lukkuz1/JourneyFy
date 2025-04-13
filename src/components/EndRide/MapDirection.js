// src/components/MapDirection.js
import React from "react";
import { View, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MapViewDirections from "react-native-maps-directions";
import { Colors } from "../../constants/styles";
import { Key } from "../../constants/key";
import styles from "../../screens/TemplateJourney/endRide/EndRideStyles";

const MapDirection = ({ routesList }) => {
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
                ...styles.markerCircle,
                borderColor:
                  item.status === "completed"
                    ? Colors.grayColor
                    : item.isPickPoint
                    ? Colors.greenColor
                    : Colors.redColor,
              }}
            >
              <MaterialIcons
                name="location-pin"
                color={
                  item.status === "completed"
                    ? Colors.grayColor
                    : item.isPickPoint
                    ? Colors.greenColor
                    : Colors.redColor
                }
                size={14.0}
              />
            </View>
          ) : (
            <Image
              source={require("../../assets/images/vehicle/vehicle1.png")}
              style={{ width: 20.0, height: 20.0, resizeMode: "contain" }}
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

export default MapDirection;
