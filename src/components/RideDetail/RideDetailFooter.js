// src/components/RideDetailFooter.js
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Colors, CommonStyles, Sizes, Fonts } from "../../constants/styles";

const RideDetailFooter = ({ ride, navigation, onCancelPress }) => {
  return (
    <View style={styles.footer}>
      {ride.isDriver ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onCancelPress}
          style={styles.cancelRideButton}
        >
          <Text numberOfLines={1} style={{ ...Fonts.primaryColor18Bold }}>
            Atšaukti kelionę
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("ConfirmPoolingScreen", { rideId: ride.id })
          }
          style={{ flex: 1, ...CommonStyles.button, marginHorizontal: Sizes.fixPadding }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.whiteColor18Bold }}>
            Kelionės prašymas
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("MessageScreen", { rideId: ride.id })
        }
        style={{ flex: 1, ...CommonStyles.button, marginHorizontal: Sizes.fixPadding }}
      >
        <Text numberOfLines={1} style={{ ...Fonts.whiteColor18Bold }}>
          Pranešti
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  footer: {
    backgroundColor: Colors.bodyBackColor,
    paddingVertical: Sizes.fixPadding * 2,
    paddingHorizontal: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
  },
  cancelRideButton: {
    flex: 1,
    ...CommonStyles.button,
    backgroundColor: Colors.whiteColor,
    marginHorizontal: Sizes.fixPadding,
    ...CommonStyles.shadow,
  },
};

export default RideDetailFooter;
