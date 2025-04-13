// src/components/SubmitButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const SubmitButton = ({ onPress }) => {
  return (
    <View style={{ backgroundColor: Colors.whiteColor }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{ ...CommonStyles.button, margin: Sizes.fixPadding * 2 }}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Pateikti</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubmitButton;
