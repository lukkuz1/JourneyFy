import React from "react";
import { View, Text } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DashedLine from "react-native-dashed-line";
import { Fonts, Sizes, Colors, CommonStyles } from "../../constants/styles";

const RiderDetail = () => {
  return (
    <View style={{ backgroundColor: Colors.whiteColor, paddingVertical: Sizes.fixPadding + 5.0 }}>
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text numberOfLines={1} style={{ ...Fonts.secondaryColor17SemiBold }}>
          Rider detail
        </Text>
      </View>
      <View style={{ marginTop: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <View style={{ ...CommonStyles.rowAlignCenter }}>
          <View style={{ ...styles.locationIconWrapper, borderColor: Colors.greenColor }}>
            <MaterialIcons name="location-pin" color={Colors.greenColor} size={15} />
          </View>
          <Text
            numberOfLines={1}
            style={{ flex: 1, ...Fonts.blackColor14Medium, marginHorizontal: Sizes.fixPadding }}
          >
            2715 Ash Dr. San Jose, South Dakota 83475
          </Text>
        </View>
        <View style={styles.verticalDashedLine} />
        <View style={{ ...CommonStyles.rowAlignCenter }}>
          <View style={{ ...styles.locationIconWrapper, borderColor: Colors.redColor }}>
            <MaterialIcons name="location-pin" color={Colors.redColor} size={15} />
          </View>
          <Text
            numberOfLines={1}
            style={{ flex: 1, ...Fonts.blackColor14Medium, marginHorizontal: Sizes.fixPadding }}
          >
            1901 Thornridge Cir. Shiloh, Hawaii 81063
          </Text>
        </View>
      </View>
      <DashedLine
        dashLength={3}
        dashThickness={1}
        dashColor={Colors.grayColor}
        style={{ marginVertical: Sizes.fixPadding + 5.0, overflow: "hidden" }}
      />
      <View style={{ ...CommonStyles.rowAlignCenter, marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
            Start time
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.grayColor14SemiBold, marginTop: Sizes.fixPadding - 8.0 }}>
            25 June,09 :00AM
          </Text>
        </View>
        <View style={styles.verticalDivider} />
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
            Return time
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.grayColor14SemiBold, marginTop: Sizes.fixPadding - 8.0 }}>
            25 june,09 :00PM
          </Text>
        </View>
        <View style={styles.verticalDivider} />
        <View style={{ flex: 0.7, alignItems: "center" }}>
          <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
            Ride with
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.grayColor14SemiBold, marginTop: Sizes.fixPadding - 8.0 }}>
            150 people
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  locationIconWrapper: {
    width: 22.0,
    height: 22.0,
    borderRadius: 11.0,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
  },
  verticalDashedLine: {
    height: 15.0,
    width: 1.0,
    borderStyle: "dashed",
    borderColor: Colors.grayColor,
    borderWidth: 0.8,
    marginLeft: Sizes.fixPadding + 1.0,
  },
  verticalDivider: {
    height: "100%",
    backgroundColor: Colors.lightGrayColor,
    width: 1.0,
    marginHorizontal: Sizes.fixPadding,
  },
};

export default RiderDetail;