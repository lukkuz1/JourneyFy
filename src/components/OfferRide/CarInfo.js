// src/components/CarInfo.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const CarInfo = ({ selectedCar, onPress }) => {
  return (
    <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
      <Text style={{ ...Fonts.blackColor15SemiBold, marginBottom: Sizes.fixPadding }}>
        Mano automobilis
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{ ...styles.valueBox, ...CommonStyles.rowAlignCenter }}
      >
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            ...(selectedCar ? { ...Fonts.blackColor15Medium } : { ...Fonts.grayColor15Medium }),
          }}
        >
          {selectedCar ? selectedCar : "Pasirinkite savo automobilį"}
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
