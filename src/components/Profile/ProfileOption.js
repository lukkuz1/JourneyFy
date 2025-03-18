import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, Fonts, Sizes } from "../../constants/styles"

const ProfileOption = ({ icon, option, detail, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={{ flexDirection: "row" }}
  >
    <MaterialCommunityIcons name={icon} size={20} color={Colors.blackColor} />
    <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
      <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
        {option}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          ...Fonts.grayColor14Medium,
          marginTop: Sizes.fixPadding - 8.0,
        }}
      >
        {detail}
      </Text>
    </View>
    <MaterialCommunityIcons
      name={"chevron-right"}
      size={24}
      color={Colors.blackColor}
      style={{ alignSelf: "center" }}
    />
  </TouchableOpacity>
);

export default ProfileOption;
