// src/components/MessageHeader.js
import React from "react";
import { View, Text, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Sizes, CommonStyles, Fonts } from "../../constants/styles";

const MessageHeader = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <MaterialIcons
        name="arrow-back-ios"
        color={Colors.whiteColor}
        size={24}
        onPress={() => navigation.pop()}
      />
      <View style={{ ...CommonStyles.rowAlignCenter, flex: 1, marginLeft: Sizes.fixPadding - 5.0 }}>
        <Image
          source={require("../../assets/images/user/user2.png")}
          style={{ width: 40.0, height: 40.0, borderRadius: 20.0 }}
        />
        <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
          <Text numberOfLines={1} style={{ ...Fonts.whiteColor14SemiBold }}>
            Jenny Wilson
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.whiteColor12Medium }}>
            Ride on 25 june 2023
          </Text>
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
