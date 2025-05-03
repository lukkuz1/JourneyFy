import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { CommonStyles, Colors, Fonts, Sizes } from "../../constants/styles";

const RateRideButton = ({ onPress }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={{ ...CommonStyles.button, margin: Sizes.fixPadding * 2 }}
  >
    <Text style={Fonts.whiteColor18Bold}>Įvertinti vairuotoją</Text>
  </TouchableOpacity>
);

export default RateRideButton;
