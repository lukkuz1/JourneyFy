// src/components/MessageInput.js
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Sizes, CommonStyles, Fonts } from "../../constants/styles";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  return (
    <View style={styles.typeMessageWrapStyle}>
      <TextInput
        cursorColor={Colors.primaryColor}
        value={message}
        onChangeText={setMessage}
        placeholder="Įveskite savo žinutę......"
        style={styles.messageFiedlStyle}
        placeholderTextColor={Colors.grayColor}
        selectionColor={Colors.primaryColor}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (message.trim() !== "") {
            onSend(message);
            setMessage("");
          }
        }}
        style={styles.sendIconWrapper}
      >
        <MaterialIcons
          name="send"
          size={24}
          color={Colors.whiteColor}
          style={{ marginLeft: Sizes.fixPadding - 5.0 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  sendIconWrapper: {
    backgroundColor: Colors.secondaryColor,
    width: 50.0,
    height: 50.0,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
  },
  typeMessageWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  messageFiedlStyle: {
    flex: 1,
    ...Fonts.blackColor14Medium,
    marginRight: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding + 2.0,
    height: 50.0,
    borderColor: Colors.secondaryColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding,
  },
};

export default MessageInput;
