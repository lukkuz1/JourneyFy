// src/components/RideDetail/RiderInfo.js
import React from "react";
import { View, Text, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const RiderInfo = ({ driver, ride }) => {
  const photoUri = driver?.photoURL || driver?.photo || null;

  return (
    <View style={{ ...CommonStyles.rowAlignCenter, margin: Sizes.fixPadding * 2 }}>
      <Image
        source={
          photoUri
            ? { uri: photoUri }
            : require("../../assets/images/user/user9.png")
        }
        style={{ width: 80, height: 80, borderRadius: Sizes.fixPadding - 5 }}
      />

      <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
        <Text numberOfLines={1} style={Fonts.blackColor17SemiBold}>
          {driver
            ? `${driver.firstName} ${driver.lastName}`
            : "Driver Name"}
        </Text>
      </View>

      <Text style={Fonts.primaryColor18SemiBold}>
        {ride.price != null ? `€${ride.price}` : "0.00€"}
      </Text>
    </View>
  );
};

export default RiderInfo;