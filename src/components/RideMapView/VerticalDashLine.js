import React from "react";
import DashedLine from "react-native-dashed-line";
import { Colors, Sizes } from "../../constants/styles";

const VerticalDashLine = () => (
  <DashedLine
    axis="vertical"
    dashLength={3}
    dashColor={Colors.lightGrayColor}
    dashThickness={1}
    style={{
      height: 45,
      marginLeft: Sizes.fixPadding - 2,
    }}
  />
);

export default VerticalDashLine;
