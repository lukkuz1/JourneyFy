import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Colors, CommonStyles, Fonts, Sizes } from "../../constants/styles";

const ContinueButton = ({ onPress }) => {
  return (
    <View style={{ backgroundColor: Colors.whiteColor }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{ ...CommonStyles.button, margin: Sizes.fixPadding * 2 }}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Tęsti</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContinueButton;
