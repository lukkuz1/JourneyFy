// src/screens/MessageScreen.js
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import { Colors } from "../../../constants/styles";

import MessageHeader from "../../../components/Message/MessageHeader";
import MessageList from "../../../components/Message/MessageList";
import MessageInput from "../../../components/Message/MessageInput";

const initialMessages = [
  {
    id: "1",
    message: "Hello Jacob good morning",
    isSender: false,
    time: "9:15 PM",
  },
  {
    id: "2",
    message: "Hii, Good morning",
    isSender: true,
    time: "9:15 PM",
  },
  {
    id: "3",
    message: "Hello, What time you reach my place",
    isSender: false,
    time: "9:20 PM",
  },
  {
    id: "4",
    message: "I will be there around 10:00 AM. Please be ready",
    isSender: true,
    time: "9:20 PM",
  },
  {
    id: "5",
    message: "Okay. I will be there on time",
    isSender: false,
    time: "9:21 PM",
  },
];

const MessageScreen = ({ navigation }) => {
  const [messages, setMessages] = useState(initialMessages);

  const addMessage = (text) => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const AmPm = hour >= 12 ? "PM" : "AM";
    const finalHour = hour > 12 ? hour - 12 : hour;
    const displayHour = finalHour.toString().padStart(2, "0");
    const displayMinute = minute.toString().padStart(2, "0");

    const newMessage = {
      id: (messages.length + 1).toString(),
      message: text,
      time: `${displayHour}:${displayMinute} ${AmPm}`,
      isSender: true,
    };

    setMessages([newMessage, ...messages]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}
    >
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <MessageHeader navigation={navigation} />
        <MessageList messages={messages} />
      </View>
      <MessageInput onSend={addMessage} />
    </KeyboardAvoidingView>
  );
};

export default MessageScreen;