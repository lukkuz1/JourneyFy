// src/components/RideDetailFooter.js
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Colors, CommonStyles, Sizes, Fonts } from "../../constants/styles";
// import the default firebase export
import firebase from "../../services/firebase";

const RideDetailFooter = ({
  ride,
  navigation,
  onCancelPress,
  onRegisterPress,
}) => {
  const user = firebase.auth.currentUser;
  const isDriver = ride.userId === user?.uid;
  const isRegistered = ride.passengers?.includes(user?.uid);

  return (
    <View style={styles.footer}>
      {isDriver ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("ConfirmPoolingScreen", { rideId: ride.id })
          }
          style={{
            flex: 1,
            ...CommonStyles.button,
            marginHorizontal: Sizes.fixPadding,
          }}
        >
          <Text numberOfLines={1} style={Fonts.whiteColor18Bold}>
            Keliauti
          </Text>
        </TouchableOpacity>
      ) : !isRegistered ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onRegisterPress}
          style={{
            flex: 1,
            ...CommonStyles.button,
            marginHorizontal: Sizes.fixPadding,
          }}
        >
          <Text numberOfLines={1} style={Fonts.whiteColor18Bold}>
            Prisijungti
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onCancelPress}
          style={styles.cancelRideButton}
        >
          <Text numberOfLines={1} style={Fonts.primaryColor18Bold}>
            Atšaukti kelionę
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("MessageScreen", { rideId: ride.id })
        }
        style={{
          flex: 1,
          ...CommonStyles.button,
          marginHorizontal: Sizes.fixPadding,
        }}
      >
        <Text numberOfLines={1} style={Fonts.whiteColor18Bold}>
          Žinutės
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