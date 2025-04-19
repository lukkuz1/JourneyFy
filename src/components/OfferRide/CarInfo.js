// src/components/OfferRide/CarInfo.js
import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { useFetchVehicles } from "../../hooks/useFetchVehicles";

/**
 * Shows the user's registered car or prompts to add one.
 * If a car exists, tapping opens the selection sheet;
 * otherwise shows an alert asking the user to add a car.
 */
const CarInfo = ({ selectedCar, onPress }) => {
  const { vehicles, loading, error } = useFetchVehicles();

  // Support only one car for now
  const userCar = vehicles.length > 0 ? vehicles[0] : null;
  const displayText =
    selectedCar ||
    (userCar ? userCar.vehicleName : "Pridėti automobilį");

  const handlePress = () => {
    if (userCar) {
      onPress();
    } else {
      Alert.alert(
        "Pridėti automobilį",
        "Prašome pridėti savo automobilį, kad galėtumėte pasiūlyti kelionę."
      );
    }
  };

  return (
    <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
      <Text
        style={{
          ...Fonts.blackColor15SemiBold,
          marginBottom: Sizes.fixPadding,
        }}
      >
        Mano automobilis
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        style={{ ...styles.valueBox, ...CommonStyles.rowAlignCenter }}
      >
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            ...(displayText !== "Pridėti automobilį"
              ? { ...Fonts.blackColor15Medium }
              : { ...Fonts.grayColor15Medium }),
          }}
        >
          {displayText}
        </Text>
        <Ionicons name="chevron-down" color={Colors.grayColor} size={20.5} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  valueBox: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding,
  },
};

export default CarInfo;