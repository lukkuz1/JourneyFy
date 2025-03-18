import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Colors, Fonts, CommonStyles } from "../../constants/styles";

const UpdateButton = ({ onPress }) => (
  <TouchableOpacity
    style={{ ...CommonStyles.button, margin: 20 }}
    onPress={onPress}
  >
    <Text style={{ ...Fonts.whiteColor18Bold }}>Atnaujinti</Text>
  </TouchableOpacity>
);

export default UpdateButton;
