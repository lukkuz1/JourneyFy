// src/components/MessageInput.js
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Sizes, CommonStyles, Fonts } from "../../constants/styles";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const send = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <View style={styles.typeMessageWrapStyle}>
      <TextInput
        cursorColor={Colors.primaryColor}
        value={message}
        onChangeText={setMessage}
        placeholder="Įveskite savo žinutę..."
        style={styles.messageFieldStyle}
        placeholderTextColor={Colors.grayColor}
        selectionColor={Colors.primaryColor}
      />
      <TouchableOpacity activeOpacity={0.8} onPress={send} style={styles.sendIconWrapper}>
        <MaterialIcons name="send" size={24} color={Colors.whiteColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  typeMessageWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2,
    marginBottom: Sizes.fixPadding * 2,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding,
  },
  messageFieldStyle: {
    flex: 1,
    ...Fonts.blackColor14Medium,
    height: 50,
  },
  sendIconWrapper: {
    backgroundColor: Colors.secondaryColor,
    width: 50,
    height: 50,
    borderRadius: Sizes.fixPadding - 5,
    alignItems: "center",
    justifyContent: "center",
  },
};

export default MessageInput;