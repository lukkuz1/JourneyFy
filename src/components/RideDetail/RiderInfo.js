// src/components/RiderInfo.js
import React from "react";
import { View, Text, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const RiderInfo = ({ driver, ride }) => {
  return (
    <View style={{ ...CommonStyles.rowAlignCenter, margin: Sizes.fixPadding * 2 }}>
      <Image
        source={
          driver?.photo
            ? { uri: driver.photo }
            : require("../../assets/images/user/user9.png")
        }
        style={{ width: 80, height: 80, borderRadius: Sizes.fixPadding - 5 }}
      />
      <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
        <Text numberOfLines={1} style={{ ...Fonts.blackColor17SemiBold }}>
          {driver
            ? `${driver.firstName} ${driver.lastName}`
            : "Driver Name"}
        </Text>
        <View style={{ ...CommonStyles.rowAlignCenter, marginVertical: Sizes.fixPadding - 6 }}>
          <Text style={{ ...Fonts.grayColor14SemiBold }}>
            {ride.rating ? ride.rating.toFixed(1) : "0.0"}
          </Text>
          <MaterialIcons name="star" color={Colors.secondaryColor} size={16} />
          <View
            style={{
              width: 1,
              backgroundColor: Colors.grayColor,
              height: "80%",
              marginHorizontal: Sizes.fixPadding - 5,
            }}
          />
          <Text numberOfLines={1} style={{ ...Fonts.grayColor14SemiBold, flex: 1 }}>
            {ride.reviewCount ? `${ride.reviewCount} review` : "No reviews"}
          </Text>
        </View>
        <Text numberOfLines={1} style={{ ...Fonts.grayColor14SemiBold }}>
          {driver?.dateOfBirth
            ? `Joined ${new Date(driver.dateOfBirth.seconds * 1000).toLocaleDateString()}`
            : "Joined Date"}
        </Text>
      </View>
      <Text style={{ ...Fonts.primaryColor18SemiBold }}>
        {ride.amount ? `$${ride.amount}` : "$0.00"}
      </Text>
    </View>
  );
};

export default RiderInfo;
