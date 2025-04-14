// src/components/StartRideButton.js
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Colors, CommonStyles, Fonts, Sizes } from "../../constants/styles";

const StartRideButton = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: Colors.whiteColor }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.push("EndRideScreen")}
        style={{ ...CommonStyles.button, marginVertical: Sizes.fixPadding * 2 }}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Start ride</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartRideButton;
