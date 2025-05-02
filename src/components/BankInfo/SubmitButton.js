// src/components/BankInfo/SubmitButton.js
import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Colors, CommonStyles, Fonts, Sizes } from "../../constants/styles";

const SubmitButton = ({ onPress }) => {
  return (
    <View style={{ backgroundColor: Colors.whiteColor }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{ ...CommonStyles.button, margin: Sizes.fixPadding * 2 }}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Send to bank (100.00)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubmitButton;
