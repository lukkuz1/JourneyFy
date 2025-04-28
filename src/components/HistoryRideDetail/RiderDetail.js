import React from "react";
import { View, Text } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DashedLine from "react-native-dashed-line";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const RiderDetail = ({ ride }) => (
  <View style={{ backgroundColor: Colors.whiteColor, paddingVertical: Sizes.fixPadding }}>
    {/* Pickup */}
    <View style={{ marginHorizontal: Sizes.fixPadding * 2, marginVertical: Sizes.fixPadding }}>
      <Text style={Fonts.secondaryColor17SemiBold}>Kelionės maršrutas</Text>
      <View style={{ ...CommonStyles.rowAlignCenter, marginTop: Sizes.fixPadding }}>
        <MaterialIcons name="location-pin" color={Colors.greenColor} size={15} />
        <Text style={{ ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding }}>
          {ride.pickup}
        </Text>
      </View>
      <View style={{ marginLeft: Sizes.fixPadding * 2 }}>
        <DashedLine
          dashLength={3}
          dashThickness={1}
          dashGap={2}
          dashColor={Colors.grayColor}
        />
      </View>
      {/* Drop */}
      <View style={{ ...CommonStyles.rowAlignCenter, marginTop: Sizes.fixPadding }}>
        <MaterialIcons name="location-pin" color={Colors.redColor} size={15} />
        <Text style={{ ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding }}>
          {ride.drop}
        </Text>
      </View>
    </View>
  </View>
);

export default RiderDetail;