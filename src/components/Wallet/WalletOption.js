// src/components/WalletOption.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const WalletOption = ({
  iconName,
  iconType,
  iconColor,
  optionTitle,
  optionSubtitle,
  containerStyle,
  onPress,
}) => {
  // Pick the proper icon component based on iconType (default: MaterialCommunityIcons)
  const IconComponent = iconType === "Ionicons" ? Ionicons : MaterialCommunityIcons;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.optionWrapper, containerStyle]}
    >
      <View style={styles.circle40}>
        <IconComponent name={iconName} color={iconColor} size={iconType === "Ionicons" ? 20 : 22} />
      </View>
      <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
        <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
          {optionTitle}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            ...Fonts.grayColor14Medium,
            marginTop: Sizes.fixPadding - 8,
          }}
        >
          {optionSubtitle}
        </Text>
      </View>
      <Ionicons name="chevron-forward-outline" color={Colors.blackColor} size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionWrapper: {
    backgroundColor: Colors.whiteColor,
    ...CommonStyles.shadow,
    borderRadius: Sizes.fixPadding,
    ...CommonStyles.rowAlignCenter,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5,
    marginTop: Sizes.fixPadding,
  },
  circle40: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.whiteColor,
    ...CommonStyles.shadow,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WalletOption;
