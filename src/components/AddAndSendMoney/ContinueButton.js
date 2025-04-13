// src/components/ContinueButton.js
import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Colors, CommonStyles, Fonts, Sizes } from "../../constants/styles";

const ContinueButton = ({ navigation, addFor }) => {
  const handlePress = () => {
    if (addFor === "money") {
      navigation.navigate("PaymentMethodsScreen");
    } else {
      navigation.navigate("BankInfoScreen");
    }
  };

  return (
    <View style={{ backgroundColor: Colors.whiteColor }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        style={{ ...CommonStyles.button, margin: Sizes.fixPadding * 2 }}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Tęsti</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContinueButton;
