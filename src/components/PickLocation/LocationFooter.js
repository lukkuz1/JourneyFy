// src/components/PickLocation/LocationFooter.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const LocationFooter = ({ address, onPickLocation }) => {
  return (
    <View style={styles.footer}>
      <View style={styles.locationInfoWrapStyle}>
        <View style={[styles.locationIconWrapper, { borderColor: Colors.greenColor }]}>
          <MaterialIcons name="location-pin" color={Colors.greenColor} size={18} />
        </View>
        <Text
          numberOfLines={2}
          style={{ marginLeft: Sizes.fixPadding, flex: 1, ...Fonts.blackColor14Medium }}
        >
          {address || "Adresas nepasirinktas"}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPickLocation}
        style={{ ...CommonStyles.button, marginVertical: Sizes.fixPadding * 2 }}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Pasirinkite šią vietą</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  footer: {
    backgroundColor: Colors.bodyBackColor,
    borderTopLeftRadius: Sizes.fixPadding * 2,
    borderTopRightRadius: Sizes.fixPadding * 2,
    paddingTop: Sizes.fixPadding * 2.5,
    marginTop: -Sizes.fixPadding * 2,
    ...CommonStyles.shadow,
  },
  locationInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 2,
    paddingVertical: Sizes.fixPadding + 5,
    marginHorizontal: Sizes.fixPadding * 2,
    justifyContent: "center",
    ...CommonStyles.rowAlignCenter,
    ...CommonStyles.shadow,
  },
  locationIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
};

export default LocationFooter;
