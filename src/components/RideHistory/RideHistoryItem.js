import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DashedLine from "react-native-dashed-line";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const RideHistoryItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("HistoryRideDetailScreen", { ride: item })
      }
      style={styles.rideWrapper}
    >
      <Image
        source={item.profile}
        style={{ width: 82, height: 82, borderRadius: Sizes.fixPadding - 5 }}
      />
      <View style={styles.rideDetailWrapper}>
        {/* Driver name */}
        <Text style={Fonts.blackColor15SemiBold}>{item.name}</Text>

        {/* Date / Time */}
        <View style={CommonStyles.rowAlignCenter}>
          <Ionicons
            name="calendar-outline"
            color={Colors.blackColor}
            size={14}
          />
          <Text
            style={{
              ...Fonts.blackColor12Medium,
              marginLeft: Sizes.fixPadding - 5,
            }}
          >
            {item.date}
          </Text>
          <View style={styles.dateTimeDivider} />
          <Ionicons name="time-outline" color={Colors.blackColor} size={14} />
          <Text
            style={{
              ...Fonts.blackColor12Medium,
              marginLeft: Sizes.fixPadding - 5,
              flex: 1,
            }}
          >
            {item.time}
          </Text>
        </View>

        {/* Pickup & Drop */}
        <View>
          <View style={CommonStyles.rowAlignCenter}>
            <View
              style={[
                styles.locationIconWrapper,
                { borderColor: Colors.greenColor },
              ]}
            >
              <MaterialIcons
                name="location-pin"
                color={Colors.greenColor}
                size={7}
              />
            </View>
            <Text
              style={{
                ...Fonts.grayColor12Medium,
                marginLeft: Sizes.fixPadding,
                flex: 1,
              }}
              numberOfLines={1}
            >
              {item.pickup}
            </Text>
          </View>
          <DashedLine
            axis="vertical"
            dashLength={2}
            dashThickness={1}
            dashGap={1.5}
            dashColor={Colors.grayColor}
            style={{ height: 5, marginLeft: Sizes.fixPadding - 4 }}
          />
          <View style={CommonStyles.rowAlignCenter}>
            <View
              style={[
                styles.locationIconWrapper,
                { borderColor: Colors.redColor },
              ]}
            >
              <MaterialIcons
                name="location-pin"
                color={Colors.redColor}
                size={7}
              />
            </View>
            <Text
              style={{
                ...Fonts.grayColor12Medium,
                marginLeft: Sizes.fixPadding,
                flex: 1,
              }}
              numberOfLines={1}
            >
              {item.drop}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rideWrapper: {
    backgroundColor: Colors.whiteColor,
    ...CommonStyles.rowAlignCenter,
    ...CommonStyles.shadow,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2,
    marginBottom: Sizes.fixPadding * 2,
  },
  rideDetailWrapper: {
    flex: 1,
    marginLeft: Sizes.fixPadding,
    justifyContent: "space-between",
  },
  dateTimeDivider: {
    marginHorizontal: Sizes.fixPadding - 5,
    width: 1,
    backgroundColor: Colors.blackColor,
    height: "100%",
  },
  locationIconWrapper: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RideHistoryItem;