// src/components/SeatInfo.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const SeatInfo = ({ selectedSeat, onPress }) => {
  return (
    <View style={{ margin: Sizes.fixPadding * 2.0 }}>
      <Text style={{ ...Fonts.blackColor15SemiBold, marginBottom: Sizes.fixPadding }}>
        Laisvų vietų sk.
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
            ...(selectedSeat
              ? { ...Fonts.blackColor15Medium }
              : { ...Fonts.grayColor15Medium }),
          }}
        >
          {selectedSeat ? `${selectedSeat}` : "Pasirinkite laisvų vietų sk."}
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

export default SeatInfo;
