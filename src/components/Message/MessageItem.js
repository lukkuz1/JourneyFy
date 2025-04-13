// src/components/MessageItem.js
import React from "react";
import { View, Text, Image } from "react-native";
import { Colors, Sizes, Fonts, screenWidth } from "../../constants/styles";

const MessageItem = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: item.isSender ? "row-reverse" : "row",
        alignItems: item.isSender ? "flex-end" : "flex-start",
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding + 2.5,
      }}
    >
      {!item.isSender && (
        <Image
          source={require("../../assets/images/user/user2.png")}
          style={styles.receiverImage}
        />
      )}
      <View
        style={{
          ...styles.messageWrapStyle,
          borderBottomRightRadius: item.isSender ? 0 : Sizes.fixPadding,
          borderTopLeftRadius: item.isSender ? Sizes.fixPadding : 0,
          backgroundColor: item.isSender ? Colors.lightSecondaryColor : Colors.whiteColor,
        }}
      >
        <Text style={{ ...Fonts.blackColor14Medium }}>{item.message}</Text>
        <Text
          style={{
            ...Fonts.grayColor12Medium,
            textAlign: "right",
            marginTop: Sizes.fixPadding - 5.0,
          }}
        >
          {item.time}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  messageWrapStyle: {
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    maxWidth: screenWidth - 150.0,
  },
  receiverImage: {
    width: 30.0,
    height: 30.0,
    borderRadius: 15.0,
    marginRight: Sizes.fixPadding - 3.0,
  },
};

export default MessageItem;
