// src/components/LocationInfo.js
import React from "react";
import { View, Text } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DashedLine from "react-native-dashed-line";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const LocationInfo = () => {
  return (
    <View style={styles.locationInfoWrapper}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ marginTop: Sizes.fixPadding + 5.0 }}>
          <View style={[styles.locationIconWrapper, { borderColor: Colors.greenColor }]}>
            <MaterialIcons name="location-pin" color={Colors.greenColor} size={18} />
          </View>
          <DashedLine
            axis="vertical"
            dashLength={3}
            dashColor={Colors.grayColor}
            dashThickness={1}
            style={{
              height: 40.0,
              marginLeft: Sizes.fixPadding + 2.0,
            }}
          />
        </View>
        <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
          <Text numberOfLines={1} style={{ ...Fonts.blackColor15SemiBold }}>
            Paėmimo taškas
          </Text>
          <Text
            numberOfLines={2}
            style={{ marginTop: Sizes.fixPadding - 8.0, ...Fonts.grayColor14Medium }}
          >
            B 420 Broome station, New york, NY 100013, USA
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginTop: Sizes.fixPadding * 2 }}>
        <View>
          <DashedLine
            axis="vertical"
            dashLength={3}
            dashColor={Colors.grayColor}
            dashThickness={1}
            style={{
              height: 16.0,
              marginLeft: Sizes.fixPadding + 2.0,
            }}
          />
          <View style={[styles.locationIconWrapper, { borderColor: Colors.redColor }]}>
            <MaterialIcons name="location-pin" color={Colors.redColor} size={18} />
          </View>
        </View>
        <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
          <Text numberOfLines={1} style={{ ...Fonts.blackColor15SemiBold }}>
            Kelionės tikslas
          </Text>
          <Text
            numberOfLines={2}
            style={{ marginTop: Sizes.fixPadding - 8.0, ...Fonts.grayColor14Medium }}
          >
            B 420 Broome station, New york, NY 100013, USA
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  locationIconWrapper: {
    width: 24.0,
    height: 24.0,
    borderRadius: 12.0,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
  },
  locationInfoWrapper: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding,
  },
};

export default LocationInfo;
