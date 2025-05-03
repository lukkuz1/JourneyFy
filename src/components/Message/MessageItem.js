// src/components/Message/MessageItem.js
import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Colors, Sizes, Fonts, screenWidth } from "../../constants/styles";
import firebase from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";

const placeholder = require("../../assets/images/user/user2.png");

const MessageItem = ({ item, driverId }) => {
  const [sender, setSender] = useState(null);
  const { senderId, isSender, message, time } = item;

  useEffect(() => {
    if (!senderId) return;
    getDoc(doc(firebase.db, "users", senderId))
      .then((snap) => {
        if (snap.exists()) setSender(snap.data());
      })
      .catch((e) => console.error("Error fetching sender profile:", e));
  }, [senderId]);

  const isDriverMsg = senderId === driverId;
  const align = isSender ? "row-reverse" : "row";
  const avatarSource = sender?.photoURL
    ? { uri: sender.photoURL }
    : placeholder;
  const nickname =
    sender?.nickname ||
    `${sender?.firstName || ""} ${sender?.lastName || ""}`.trim() ||
    "Naudotojas";

  return (
    <View
      style={{
        flexDirection: align,
        alignItems: isSender ? "flex-end" : "flex-start",
        marginHorizontal: Sizes.fixPadding * 2,
        marginVertical: Sizes.fixPadding + 2.5,
      }}
    >
      <Image source={avatarSource} style={styles.avatar} />

      <View style={{ maxWidth: screenWidth - 120 }}>
        <Text
          style={[
            Fonts.grayColor12Medium,
            { textAlign: isSender ? "right" : "left", marginBottom: 2 },
          ]}
        >
          {nickname}
        </Text>

        <View
          style={{
            ...styles.messageWrapStyle,
            borderBottomRightRadius: isSender ? 0 : Sizes.fixPadding,
            borderTopLeftRadius: isSender ? Sizes.fixPadding : 0,
            backgroundColor: isSender
              ? Colors.lightSecondaryColor
              : Colors.whiteColor,
            borderWidth: isDriverMsg ? 1 : 0,
            borderColor: isDriverMsg ? Colors.primaryColor : "transparent",
          }}
        >
          <Text style={Fonts.blackColor14Medium}>{message}</Text>
          <Text
            style={{
              ...Fonts.grayColor12Medium,
              textAlign: "right",
              marginTop: Sizes.fixPadding - 5,
            }}
          >
            {time}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: Sizes.fixPadding - 3,
  },
  messageWrapStyle: {
    paddingHorizontal: Sizes.fixPadding + 5,
    paddingVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
  },
};

export default MessageItem;
