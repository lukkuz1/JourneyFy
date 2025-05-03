import React, { useState, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Colors } from "../../constants/styles";
import { Key } from "../../constants/key";

const MapDirection = ({ ride }) => {
  const [coords, setCoords] = useState([]);
  const mapRef = useRef(null);

  if (!ride) return null;
  const { pickupAddress, destinationAddress } = ride;

  const onReady = (result) => {
    setCoords(result.coordinates);
    mapRef.current.fitToCoordinates(result.coordinates, {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  };

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      mapType="terrain"
      style={{ flex: 1 }}
    >
      <MapViewDirections
        origin={pickupAddress}
        destination={destinationAddress}
        apikey={Key.apiKey}
        strokeWidth={3}
        strokeColor={Colors.primaryColor}
        onReady={onReady}
      />
      {coords.length > 0 && (
        <>
          <Marker coordinate={coords[0]} pinColor={Colors.greenColor} />
          <Marker
            coordinate={coords[coords.length - 1]}
            pinColor={Colors.redColor}
          />
        </>
      )}
    </MapView>
  );
};

export default MapDirection;
