import React from "react";
import { View, Text, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const RiderInfo = ({ ride }) => (
  <View
    style={{ ...CommonStyles.rowAlignCenter, margin: Sizes.fixPadding * 2 }}
  >
    <Image
      source={ride.profile}
      style={{ width: 80, height: 80, borderRadius: Sizes.fixPadding - 5 }}
    />
    <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
      <Text style={Fonts.blackColor17SemiBold}>{ride.name}</Text>
      <Text style={Fonts.grayColor14SemiBold}>
        {ride.journeyDateTime || `${ride.date} ${ride.time}`}
      </Text>
    </View>
    <Text style={Fonts.primaryColor18SemiBold}>{ride.price} €</Text>
  </View>
);

export default RiderInfo;
