// src/components/RideItem.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DashedLine from "react-native-dashed-line";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const RideItem = ({ item, navigation }) => {
  // summary fields
  const pickup = item.pickup ?? item.__raw?.pickupAddress;
  const drop   = item.drop   ?? item.__raw?.destinationAddress;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("RideDetailScreen", {
          ride: { id: item.id, ...item.__raw },
        })
      }
      style={styles.rideWrapper}
    >
      <Image
        source={item.profile}
        style={{ width: 82, height: 82, borderRadius: Sizes.fixPadding - 5 }}
      />
      <View style={styles.details}>
        <Text style={Fonts.blackColor15SemiBold}>{item.name}</Text>

        {/* Car model */}
        {item.car && (
          <Text style={{ ...Fonts.grayColor12Medium, marginTop: 2 }}>
            Modelis: {item.car}
          </Text>
        )}

        {/* Date & Time */}
        <View style={{ ...CommonStyles.rowAlignCenter, marginTop: Sizes.fixPadding - 4 }}>
          <Ionicons name="calendar-outline" color={Colors.blackColor} size={14} />
          <Text style={{ ...Fonts.blackColor12Medium, marginLeft: 4 }}>
            {item.date}
          </Text>
          <View style={styles.dateTimeDivider} />
          <Ionicons name="time-outline" color={Colors.blackColor} size={14} />
          <Text style={{ ...Fonts.blackColor12Medium, marginLeft: 4 }}>
            {item.time}
          </Text>
        </View>

        {/* Pickup & Drop */}
        <View style={{ marginTop: Sizes.fixPadding - 4 }}>
          <View style={CommonStyles.rowAlignCenter}>
            <View style={[styles.locationDot, { borderColor: Colors.greenColor }]}>
              <MaterialIcons name="location-pin" color={Colors.greenColor} size={7} />
            </View>
            <Text style={{ ...Fonts.grayColor12Medium, marginLeft: Sizes.fixPadding }}>
              {pickup}
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
            <View style={[styles.locationDot, { borderColor: Colors.redColor }]}>
              <MaterialIcons name="location-pin" color={Colors.redColor} size={7} />
            </View>
            <Text style={{ ...Fonts.grayColor12Medium, marginLeft: Sizes.fixPadding }}>
              {drop}
            </Text>
          </View>
        </View>
      </View>

      {/* Price */}
      <View style={styles.priceWrapper}>
        <Text style={Fonts.primaryColor18SemiBold}>€{item.price}</Text>
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
  details: {
    flex: 1,
    marginLeft: Sizes.fixPadding,
  },
  dateTimeDivider: {
    marginHorizontal: Sizes.fixPadding / 2,
    width: 1,
    backgroundColor: Colors.blackColor,
    height: "80%",
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  priceWrapper: {
    marginLeft: 8,
  },
});

export default RideItem;