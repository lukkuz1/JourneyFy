// src/components/RiderDetail.js
import React from "react";
import { View, Text } from "react-native";
import DashedLine from "react-native-dashed-line";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const RiderDetail = ({ ride, navigation }) => {
  return (
    <View style={{ backgroundColor: Colors.whiteColor, paddingVertical: Sizes.fixPadding + 5 }}>
      <View style={{ marginHorizontal: Sizes.fixPadding * 2 }}>
        <View style={{ ...CommonStyles.rowAlignCenter }}>
          <Text numberOfLines={1} style={{ flex: 1, ...Fonts.secondaryColor17SemiBold }}>
            Kelionės informacija
          </Text>
        </View>
      </View>
      <View style={{ marginTop: Sizes.fixPadding + 5, marginHorizontal: Sizes.fixPadding * 2 }}>
        <View style={{ ...CommonStyles.rowAlignCenter }}>
          <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 1, alignItems: "center", justifyContent: "center", borderColor: Colors.greenColor }}>
            <MaterialIcons name="location-pin" color={Colors.greenColor} size={15} />
          </View>
          <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor14Medium, marginHorizontal: Sizes.fixPadding }}>
            {ride.pickupAddress || "No pickup address"}
          </Text>
        </View>
        <View style={{
          height: 15,
          width: 1,
          borderStyle: "dashed",
          borderColor: Colors.grayColor,
          borderWidth: 0.8,
          marginLeft: Sizes.fixPadding + 1,
        }} />
        <View style={{ ...CommonStyles.rowAlignCenter }}>
          <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 1, alignItems: "center", justifyContent: "center", borderColor: Colors.redColor }}>
            <MaterialIcons name="location-pin" color={Colors.redColor} size={15} />
          </View>
          <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor14Medium, marginHorizontal: Sizes.fixPadding }}>
            {ride.destinationAddress || "No destination address"}
          </Text>
        </View>
      </View>
      <DashedLine
        dashLength={3}
        dashThickness={1}
        dashColor={Colors.grayColor}
        style={{ marginVertical: Sizes.fixPadding + 5, overflow: "hidden" }}
      />
      <View style={{ ...CommonStyles.rowAlignCenter, marginHorizontal: Sizes.fixPadding * 2 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
            Pradžios laikas
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.grayColor14SemiBold, marginTop: Sizes.fixPadding - 8 }}>
            {ride.journeyDateTime || "N/A"}
          </Text>
        </View>
        {/* <View style={{ flex: 1, alignItems: "center" }}>
          <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
            Grįžimo laikas
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.grayColor14SemiBold, marginTop: Sizes.fixPadding - 8 }}>
            {ride.returnTime || "N/A"}
          </Text>
        </View> */}
        {/* <View style={{
          height: "100%",
          backgroundColor: Colors.lightGrayColor,
          width: 1,
          marginHorizontal: Sizes.fixPadding,
        }} />
        <View style={{ flex: 0.7, alignItems: "center" }}>
          <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
            Kelionė su
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.grayColor14SemiBold, marginTop: Sizes.fixPadding - 8 }}>
            {ride.totalCapacity ? `${ride.totalCapacity} people` : "N/A"}
          </Text>
        </View> */}
      </View>
    </View>
  );
};

export default RiderDetail;
