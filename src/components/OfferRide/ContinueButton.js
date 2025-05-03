import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Colors, CommonStyles, Sizes, Fonts } from "../../constants/styles";

const ContinueButton = ({ onPress }) => {
  return (
    <View style={{ backgroundColor: Colors.bodyBackColor }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          ...CommonStyles.button,
          marginVertical: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Tęsti</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContinueButton;
