
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Colors, CommonStyles, Sizes, Fonts } from "../../constants/styles";
import firebase from "../../services/firebase";

export default function RideDetailFooter({
  ride,
  navigation,
  onCancelPress,
  onRegisterPress,
  onDeletePress,
}) {
  const user = firebase.auth.currentUser;
  const isDriver = ride.userId === user?.uid;
  const isRegistered = ride.passengers?.includes(user?.uid);

  return (
    <View style={styles.footer}>
      {isDriver ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onDeletePress}
          style={{
            ...CommonStyles.button,
            flex: 1,
            marginHorizontal: Sizes.fixPadding,
          }}
        >
          <Text numberOfLines={1} style={Fonts.whiteColor18Bold}>
            Ištrinti kelionę
          </Text>
        </TouchableOpacity>
      ) : isRegistered ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onCancelPress}
          style={styles.cancelButton}
        >
          <Text numberOfLines={1} style={Fonts.primaryColor18Bold}>
            Atšaukti kelionę
          </Text>
        </TouchableOpacity>
      ) : (
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
}

const styles = {
  footer: {
    backgroundColor: Colors.bodyBackColor,
    paddingVertical: Sizes.fixPadding * 2,
    paddingHorizontal: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    ...CommonStyles.button,
    backgroundColor: Colors.whiteColor,
    marginHorizontal: Sizes.fixPadding,
    ...CommonStyles.shadow,
  },
};
