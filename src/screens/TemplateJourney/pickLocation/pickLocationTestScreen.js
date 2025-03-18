import "react-native-get-random-values";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Key } from "../../../constants/key";
import { Input } from "@rneui/themed";
import MyStatusBar from "../../../components/myStatusBar";
import Geocoder from "react-native-geocoding";

const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = 0.1;

const getRandomCoordinate = () => {
  const minLat = -90;
  const maxLat = 90;
  const minLng = -180;
  const maxLng = 180;

  return {
    latitude: Math.random() * (maxLat - minLat) + minLat,
    longitude: Math.random() * (maxLng - minLng) + minLng,
  };
};

const PickLocationTestScreen = ({ navigation, route }) => {
  const [currentmarker, setCurrentMarker] = useState(getRandomCoordinate());
  const [address, setAddress] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    Geocoder.init(Key.apiKey);
    getAddress(currentmarker);
  }, [currentmarker]);

  // ✅ Log when the marker updates
  useEffect(() => {
    console.log("🔹 Current Marker Updated:", currentmarker);
  }, [currentmarker]);

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        {searchBar()}
        {mapView()}
        <View style={styles.footer}>{locationInfo()}</View>
      </KeyboardAvoidingView>
    </View>
  );

  function searchBar() {
    return (
      <GooglePlacesAutocomplete
        placeholder="Search Location"
        fetchDetails={true}
        onPress={(data, details = null) => {
          if (details) {
            console.log("✅ Location Selected:", details.geometry.location);
            setSearch(data.description);
            setCurrentMarker({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
          }
        }}
        query={{
          key: Key.apiKey,
          language: "en",
        }}
        styles={{ textInput: { height: 40, margin: 10 } }}
        textInputProps={{
          InputComp: Input,
          value: search,
          onChangeText: setSearch,
          inputContainerStyle: { borderBottomWidth: 0.0 },
        }}
      />
    );
  }

  function locationInfo() {
    return (
      <View style={styles.locationInfoWrapStyle}>
        <Text>{address || "Random Location"}</Text>
      </View>
    );
  }

  function mapView() {
    return (
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: currentmarker.latitude,
          longitude: currentmarker.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={currentmarker}
          draggable
          onDragEnd={(e) => {
            console.log("📌 Marker Dragged:", e.nativeEvent.coordinate);
            setCurrentMarker(e.nativeEvent.coordinate);
          }}
        />
      </MapView>
    );
  }

  function getAddress(location) {
    console.log("📍 Fetching Address for:", location);
    Geocoder.from(location.latitude, location.longitude)
      .then((json) => {
        const addressComponent = json.results[0]?.formatted_address || "Unknown Address";
        console.log("📬 Address Found:", addressComponent);
        setAddress(addressComponent);
      })
      .catch((error) => console.warn("⚠️ Geocoder error:", error));
  }
};

export default PickLocationTestScreen;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "white",
    padding: 20,
  },
  locationInfoWrapStyle: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
