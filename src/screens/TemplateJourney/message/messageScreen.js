// src/screens/MessageScreen.js
import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import { Colors } from "../../../constants/styles";

import MessageHeader from "../../../components/Message/MessageHeader";
import MessageList from "../../../components/Message/MessageList";
import MessageInput from "../../../components/Message/MessageInput";

import firebase from "../../../services/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const MessageScreen = ({ navigation, route }) => {
  const { rideId } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const user = firebase.auth.currentUser;
    if (!user) return navigation.goBack();

    // subscribe to the messages subcollection
    const messagesRef = collection(firebase.db, "journeys", rideId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const msgs = snapshot.docs.map(doc => {
          const { text, senderId, createdAt } = doc.data();
          const date = createdAt?.toDate() || new Date();
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const ampm = hours >= 12 ? "PM" : "AM";
          const displayHour = hours % 12 === 0 ? 12 : hours % 12;
          const time = `${displayHour.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")} ${ampm}`;

          return {
            id: doc.id,
            message: text,
            isSender: senderId === user.uid,
            time,
          };
        });
        setMessages(msgs);
      },
      err => console.error("Messages subscription error:", err)
    );

    return unsubscribe;
  }, [rideId, navigation]);

  const handleSend = async text => {
    const user = firebase.auth.currentUser;
    if (!user) return;
    const messagesRef = collection(firebase.db, "journeys", rideId, "messages");
    try {
      await addDoc(messagesRef, {
        text,
        senderId: user.uid,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Send message error:", err);
    }
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
      <MessageInput onSend={handleSend} />
    </KeyboardAvoidingView>
  );
};

export default MessageScreen;