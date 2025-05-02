// src/components/PickLocation/PickLocationMap.js
import React from "react";
import { Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Colors, screenWidth, screenHeight, Sizes } from "../../constants/styles";

const LATITUDE_DELTA = 0.1;
const ASPECT_RATIO = screenWidth / screenHeight;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const PickLocationMap = ({ currentMarker, onMarkerDragEnd }) => {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: currentMarker.latitude,
        longitude: currentMarker.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      provider={PROVIDER_GOOGLE}
    >
      <Marker
        coordinate={currentMarker}
        draggable
        onDragEnd={(e) => {
          const newLocation = e.nativeEvent.coordinate;
          onMarkerDragEnd(newLocation);
        }}
      >
        <Image
          source={require("../../assets/images/icons/marker.png")}
          style={{ width: 40, height: 40, resizeMode: "contain" }}
        />
      </Marker>
    </MapView>
  );
};

export default PickLocationMap;
