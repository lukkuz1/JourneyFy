// src/components/EndRideButton.js
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { CommonStyles, Colors, Fonts, Sizes } from "../../constants/styles";

const EndRideButton = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: Colors.whiteColor }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.push("RideComplete")}
        style={{ ...CommonStyles.button, marginVertical: Sizes.fixPadding * 2.0 }}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Užbaigti kelionę</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EndRideButton;