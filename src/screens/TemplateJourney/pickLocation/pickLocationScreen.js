import "react-native-get-random-values";
import React, { useState, useEffect } from "react";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import { Colors, screenHeight, screenWidth } from "../../../constants/styles";
import LocationSearchHeader from "../../../components/PickLocation/LocationSearchHeader";
import PickLocationMap from "../../../components/PickLocation/PickLocationMap";
import LocationFooter from "../../../components/PickLocation/LocationFooter";
import Geocoder from "react-native-geocoding";
import * as Location from "expo-location";
import { Key } from "../../../constants/key";

const LATITUDE = 54.8985;
const LONGITUDE = 23.9036;
const SPACE = 0.01;

const PickLocationScreen = ({ navigation, route }) => {
  const [currentMarker, setCurrentMarker] = useState({
    latitude: LATITUDE - SPACE,
    longitude: LONGITUDE - SPACE,
  });
  const [address, setAddress] = useState("");
  const [search, setSearch] = useState("");

  const params = route?.params || {};
  const addressFor = params.addressFor || "unknown";

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log("Device location:", latitude, longitude);
      setCurrentMarker({ latitude, longitude });
    })();
  }, []);

  useEffect(() => {
    Geocoder.init(Key.apiKey);
    if (currentMarker.latitude && currentMarker.longitude) {
      getAddress(currentMarker);
    }
  }, [currentMarker]);

  const getAddress = (location) => {
    Geocoder.from(location.latitude, location.longitude)
      .then((json) => {
        const addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
      })
      .catch((error) => console.warn("Geocoder error:", error));
  };

  const setMarkerBySearch = async (locationObj) => {
    try {
      if (!locationObj) {
        console.warn("Invalid location data");
        return;
      }
      console.log("Setting marker for:", locationObj);
      setCurrentMarker({
        latitude: locationObj.lat,
        longitude: locationObj.lng,
      });
      getAddress({ latitude: locationObj.lat, longitude: locationObj.lng });
    } catch (error) {
      console.warn("Geocoding error:", error);
    }
  };

  const handleMarkerDragEnd = (newLocation) => {
    setCurrentMarker(newLocation);
    getAddress(newLocation);
  };

  const handlePickLocation = () => {
    console.log("Selected Address:", address);
    navigation.navigate("HomeScreen", { address, addressFor });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <LocationSearchHeader
          search={search}
          setSearch={setSearch}
          onLocationSelected={setMarkerBySearch}
          onBackPress={() => navigation.goBack()}
        />
        <PickLocationMap
          currentMarker={currentMarker}
          onMarkerDragEnd={handleMarkerDragEnd}
        />
        <LocationFooter address={address} onPickLocation={handlePickLocation} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default PickLocationScreen;
