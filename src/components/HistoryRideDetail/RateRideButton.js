import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { CommonStyles, Colors, Fonts, Sizes } from "../../constants/styles";

const RateRideButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{ ...CommonStyles.button, margin: Sizes.fixPadding * 2.0 }}
    >
      <Text style={{ ...Fonts.whiteColor18Bold }}>Rate your ride</Text>
    </TouchableOpacity>
  );
};

export default RateRideButton;