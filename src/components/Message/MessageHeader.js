// src/components/Message/MessageHeader.js
import React from "react";
import { View, Text, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Sizes, CommonStyles, Fonts } from "../../constants/styles";

const MessageHeader = ({ navigation, driver, ride }) => {
  const photoUri = driver?.photoURL || driver?.photo || null;
  const subtitle = ride?.journeyDateTime
    ? `Ride on ${ride.journeyDateTime}`
    : "";

  return (
    <View style={styles.header}>
      <MaterialIcons
        name="arrow-back-ios"
        color={Colors.whiteColor}
        size={24}
        onPress={() => navigation.pop()}
      />
      <View
        style={{
          ...CommonStyles.rowAlignCenter,
          flex: 1,
          marginLeft: Sizes.fixPadding - 5.0,
        }}
      >
        <Image
          source={
            photoUri
              ? { uri: photoUri }
              : require("../../assets/images/user/user2.png")
          }
          style={{ width: 40.0, height: 40.0, borderRadius: 20.0 }}
        />
        <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
          <Text numberOfLines={1} style={Fonts.whiteColor14SemiBold}>
            {driver
              ? `${driver.firstName} ${driver.lastName}`
              : "Driver"}
          </Text>
          {subtitle ? (
            <Text numberOfLines={1} style={Fonts.whiteColor12Medium}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = {
  header: {
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    ...CommonStyles.rowAlignCenter,
  },
};

export default MessageHeader;