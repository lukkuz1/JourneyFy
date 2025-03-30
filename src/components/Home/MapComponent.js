import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const MapComponent = () => {
  return (
    <MapView
      region={{
        latitude: 54.6872,
        longitude: 25.2797,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
    />
  );
};

export default MapComponent;
