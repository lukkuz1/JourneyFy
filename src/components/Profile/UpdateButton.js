import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors, Sizes, Fonts, CommonStyles } from "../../constants/styles";

const UpdateButton = ({ onPress }) => (
  <TouchableOpacity
    style={{ ...CommonStyles.button, margin: Sizes.fixPadding * 2 }}
    onPress={onPress}
  >
    <Text style={{ ...Fonts.whiteColor18Bold }}>Atnaujinti</Text>
  </TouchableOpacity>
);

export default UpdateButton;
