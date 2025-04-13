// src/components/ContinueButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Colors, CommonStyles, Fonts, Sizes } from "../../constants/styles";

const ContinueButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{ ...CommonStyles.button, marginVertical: Sizes.fixPadding * 2 }}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Tęsti</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
  },
});

export default ContinueButton;
