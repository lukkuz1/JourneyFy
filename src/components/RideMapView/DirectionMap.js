import React from "react";
import { Image, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  Colors,
  Sizes,
  screenWidth,
  screenHeight,
  Fonts,
} from "../../constants/styles";
import { Key } from "../../constants/key";

const DirectionMap = () => {
  const startPoint = { latitude: 22.573856, longitude: 88.243163 };
  const pickupPoint = { latitude: 22.553686, longitude: 88.314735 };
  const currentPoint = { latitude: 22.583686, longitude: 88.401745 };
  const destinationPoint = { latitude: 22.64978, longitude: 88.41377 };
  const endPoint = { latitude: 22.70668, longitude: 88.41377 };

  return (
    <MapView
      region={{
        latitude: 22.493643,
        longitude: 88.35588,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      }}
      style={{ height: "100%" }}
      provider={PROVIDER_GOOGLE}
      mapType="terrain"
    >
      <MapViewDirections
        origin={startPoint}
        destination={pickupPoint}
        apikey={Key.apiKey}
        strokeColor={Colors.primaryColor}
        strokeWidth={3}
      />
      <MapViewDirections
        origin={pickupPoint}
        destination={currentPoint}
        apikey={Key.apiKey}
        strokeColor={Colors.primaryColor}
        strokeWidth={3}
      />
      <MapViewDirections
        origin={currentPoint}
        destination={destinationPoint}
        apikey={Key.apiKey}
        strokeColor={Colors.primaryColor}
        strokeWidth={3}
      />
      <MapViewDirections
        origin={destinationPoint}
        destination={endPoint}
        apikey={Key.apiKey}
        strokeColor={Colors.primaryColor}
        strokeWidth={3}
      />

      <Marker coordinate={startPoint}>
        <Image
          source={require("../../assets/images/icons/car.png")}
          style={{ width: 35, height: 35, resizeMode: "contain" }}
        />
      </Marker>
      <Marker coordinate={pickupPoint}>
        <View style={{ ...styles.markerCircle, borderColor: Colors.redColor }}>
          <MaterialIcons
            name="location-pin"
            color={Colors.redColor}
            size={20}
          />
        </View>
      </Marker>
      <Marker coordinate={currentPoint}>
        <View
          style={{
            backgroundColor: Colors.secondaryColor,
            padding: Sizes.fixPadding - 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ ...Fonts.whiteColor13SemiBold }}>42 km</Text>
        </View>
      </Marker>
      <Marker coordinate={destinationPoint}>
        <View
          style={{ ...styles.markerCircle, borderColor: Colors.primaryColor }}
        >
          <MaterialIcons
            name="location-pin"
            color={Colors.primaryColor}
            size={20}
          />
        </View>
      </Marker>
      <Marker coordinate={endPoint}>
        <Image
          source={require("../../assets/images/icons/car.png")}
          style={{ width: 35, height: 35, resizeMode: "contain" }}
        />
      </Marker>
    </MapView>
  );
};

const styles = {
  markerCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.whiteColor,
  },
};

export default DirectionMap;
