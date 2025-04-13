// src/components/LocationSearchHeader.js
import React from "react";
import { View, Platform } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Input } from "@rneui/themed";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { Key } from "../../constants/key";

const LocationSearchHeader = ({ search, setSearch, onLocationSelected, onBackPress }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerBg} />
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back-ios"
          color={Colors.whiteColor}
          size={24}
          style={{ marginTop: Sizes.fixPadding }}
          onPress={onBackPress}
        />
        <View style={styles.searchFieldWrapStyle}>
          <Ionicons
            name="search"
            color={Colors.grayColor}
            size={20}
            style={{ marginTop: Sizes.fixPadding - 3.0 }}
          />
          <GooglePlacesAutocomplete
            placeholder="Ieškokite vietos čia"
            minLength={2}
            fetchDetails={true}
            onPress={(data, details = null) => {
              if (details) {
                setSearch(data.description);
                onLocationSelected(details.geometry.location);
              }
            }}
            query={{
              key: Key.apiKey,
              language: "en",
              components: "country:us",
            }}
            styles={{
              textInput: { height: 40, marginRight: -20 },
              listView: {
                backgroundColor: "white",
                zIndex: 1000,
                elevation: 5,
              },
            }}
            listViewDisplayed="auto"
            textInputProps={{
              InputComp: Input,
              value: search,
              onChangeText: setSearch,
              inputContainerStyle: { borderBottomWidth: 0, height: 40 },
              inputStyle: { ...Fonts.blackColor16SemiBold },
              containerStyle: { marginLeft: -Sizes.fixPadding, height: 40 },
              selectionColor: Colors.primaryColor,
            }}
          />
          {search && Platform.OS === "android" && (
            <MaterialIcons
              name="close"
              size={20}
              color={Colors.grayColor}
              style={{ marginTop: Sizes.fixPadding - 3.0 }}
              onPress={() => setSearch("")}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = {
  headerContainer: {
    position: "relative",
  },
  headerBg: {
    backgroundColor: Colors.primaryColor,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 90,
    zIndex: 90,
  },
  header: {
    flexDirection: "row",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 100,
    padding: Sizes.fixPadding * 2,
  },
  searchFieldWrapStyle: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
    paddingTop: Sizes.fixPadding - 6,
    marginLeft: Sizes.fixPadding,
    ...CommonStyles.shadow,
  },
};

export default LocationSearchHeader;
