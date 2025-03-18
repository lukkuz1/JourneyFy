import "react-native-get-random-values";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  Colors,
  Fonts,
  Sizes,
  CommonStyles,
  screenHeight,
  screenWidth,
} from "../../../constants/styles";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Key } from "../../../constants/key";
import { Input } from "@rneui/themed";
import MyStatusBar from "../../../components/myStatusBar";
import Geocoder from "react-native-geocoding";
import * as Location from "expo-location";

const LATITUDE = 35.78825;
const LONGITUDE = -121.4324;
const SPACE = 0.01;
const ASPECT_RATIO = screenWidth / screenHeight;
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const PickLocationScreen = ({ navigation, route }) => {
  const [currentmarker, setCurrentMarker] = useState({
    latitude: LATITUDE - SPACE,
    longitude: LONGITUDE - SPACE,
  });
  const [address, setAddress] = useState("");
  const [search, setSearch] = useState("");

  // ✅ Ensure route.params is always defined
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
  
      // Update marker and fetch address
      setCurrentMarker({ latitude, longitude });
    })();
  }, []);
  
  useEffect(() => {
    Geocoder.init(Key.apiKey);
  
    if (currentmarker.latitude && currentmarker.longitude) {
      getAddress(currentmarker);
    }
  }, [currentmarker]); // Ensure it runs when the marker updates


  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {headerBg()}
        {header()}
        {mapView()}
        <View style={styles.footer}>
          {locationInfo()}
          {pickLocationButton()}
        </View>
      </KeyboardAvoidingView>
    </View>
  );

  function headerBg() {
    return <View style={styles.headerBg}></View>;
  }

  function header() {
    return (
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back-ios"
          color={Colors.whiteColor}
          size={24}
          style={{ marginTop: Sizes.fixPadding }}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.searchFieldWrapStyle}>
          <Ionicons
            name="search"
            color={Colors.grayColor}
            size={20}
            style={{ marginTop: Sizes.fixPadding - 3.0 }}
          />
          <GooglePlacesAutocomplete
  placeholder={"Ieškokite vietos čia"}
  minLength={2} // Ensures a minimum of 2 characters before searching
  fetchDetails={true} // ✅ Must be true to get location details
  onPress={(data, details = null) => {
    if (details) {
      setSearch(data.description);
      setTheMarkerAccordingSearch(data.description);
    }
  }}
  query={{
    key: Key.apiKey,
    language: "en",
    components: "country:us",
  }}
  styles={{
    textInput: { height: 40, marginRight: -20.0 },
    listView: { 
      backgroundColor: "white", 
      zIndex: 1000, // ✅ Ensures dropdown appears above other components
      elevation: 5, // ✅ Adds shadow for visibility
    },
  }}
  listViewDisplayed="auto" // ✅ Ensures list appears
  textInputProps={{
    InputComp: Input,
    value: search,
    onChangeText: setSearch,
    inputContainerStyle: { borderBottomWidth: 0.0, height: 40.0 },
    inputStyle: { ...Fonts.blackColor16SemiBold },
    containerStyle: { marginLeft: -Sizes.fixPadding, height: 40.0 },
    selectionColor: Colors.primaryColor,
  }}
/>
          {search && Platform.OS === "android" && (
            <MaterialIcons
              name="close"
              size={20}
              color={Colors.grayColor}
              style={{ marginTop: Sizes.fixPadding - 3.0 }}
              onPress={(data, details = null) => {
                if (details) {
                  setSearch(data.description);
                  setTheMarkerAccordingSearch(details.geometry.location); // ✅ Corrected
                }
              }}
            />
          )}
        </View>
      </View>
    );
  }

  function locationInfo() {
    return (
      <View style={styles.locationInfoWrapStyle}>
        <View
          style={{
            borderColor:
              addressFor === "pickup" ? Colors.greenColor : Colors.redColor,
            ...styles.locationIconWrapper,
          }}
        >
          <MaterialIcons
            name="location-pin"
            color={
              addressFor === "pickup" ? Colors.greenColor : Colors.redColor
            }
            size={18}
          />
        </View>
        <Text
          numberOfLines={2}
          style={{
            marginLeft: Sizes.fixPadding,
            flex: 1,
            ...Fonts.blackColor14Medium,
          }}
        >
          {address || "Adresas nepasirinktas"}
        </Text>
      </View>
    );
  }

  function pickLocationButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          console.log("Selected Address:", address);
          navigation.navigate("HomeScreen", {
            address: address,
            addressFor: addressFor,
          });
        }}
        style={{
          ...CommonStyles.button,
          marginVertical: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Pasirinkite šią vietą</Text>
      </TouchableOpacity>
    );
  }

  async function setTheMarkerAccordingSearch(location) {
    try {
      if (!location) {
        console.warn("Invalid location data");
        return;
      }
  
      console.log("Setting marker for:", location);
  
      // Update the marker
      setCurrentMarker({
        latitude: location.lat,
        longitude: location.lng,
      });
  
      getAddress({ latitude: location.lat, longitude: location.lng }); // ✅ Fetch address
    } catch (error) {
      console.warn("Geocoding error:", error);
    }
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
          onDragEnd={(e) => {
            const newLocation = e.nativeEvent.coordinate;
            setCurrentMarker(newLocation);
            getAddress(newLocation);
          }}
          draggable
        >
          <Image
            source={require("../../../assets/images/icons/marker.png")}
            style={{ width: 40.0, height: 40.0, resizeMode: "contain" }}
          />
        </Marker>
      </MapView>
    );
  }

  function getAddress(location) {
    Geocoder.from(location.latitude, location.longitude)
      .then((json) => {
        const addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
      })
      .catch((error) => console.warn("Geocoder error:", error));
  }
};

export default PickLocationScreen;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: Colors.bodyBackColor,
    borderTopLeftRadius: Sizes.fixPadding * 2.0,
    borderTopRightRadius: Sizes.fixPadding * 2.0,
    paddingTop: Sizes.fixPadding * 2.5,
    marginTop: -Sizes.fixPadding * 2.0,
    ...CommonStyles.shadow,
  },
  locationInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "center",
    ...CommonStyles.rowAlignCenter,
    ...CommonStyles.shadow,
  },
  searchFieldWrapStyle: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
    paddingTop: Sizes.fixPadding - 6.0,
    marginLeft: Sizes.fixPadding,
    ...CommonStyles.shadow,
  },
  locationIconWrapper: {
    width: 24.0,
    height: 24.0,
    borderRadius: 12.0,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
  },
  headerBg: {
    backgroundColor: Colors.primaryColor,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 90.0,
    zIndex: 90,
  },
  header: {
    flexDirection: "row",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 100,
    padding: Sizes.fixPadding * 2.0,
  },
});
