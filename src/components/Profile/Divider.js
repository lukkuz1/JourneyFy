import React from "react";
import { View } from "react-native";
import { Colors, Sizes } from "../../constants/styles";

const Divider = () => (
  <View
    style={{
      backgroundColor: Colors.lightGrayColor,
      height: 1.0,
      marginVertical: Sizes.fixPadding * 2.0,
    }}
  />
);

export default Divider;
