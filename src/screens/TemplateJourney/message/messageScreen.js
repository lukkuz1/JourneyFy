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
  doc,
  getDoc,
} from "firebase/firestore";

const MessageScreen = ({ navigation, route }) => {
  const { rideId } = route.params;
  const [messages, setMessages] = useState([]);
  const [driver, setDriver] = useState(null);
  const [rideInfo, setRideInfo] = useState(null);

  useEffect(() => {
    const user = firebase.auth.currentUser;
    if (!user) return navigation.goBack();

    // Subscribe to messages
    const messagesRef = collection(firebase.db, "journeys", rideId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    const unsubscribeMessages = onSnapshot(
      q,
      (snapshot) => {
        const msgs = snapshot.docs.map((docSnap) => {
          const { text, senderId, createdAt } = docSnap.data();
          const date = createdAt?.toDate() || new Date();
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const ampm = hours >= 12 ? "PM" : "AM";
          const displayHour = hours % 12 === 0 ? 12 : hours % 12;
          const time = `${displayHour
            .toString()
            .padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${ampm}`;
          return {
            id: docSnap.id,
            senderId,
            message: text,
            isSender: senderId === user.uid,
            time,
          };
        });
        setMessages(msgs);
      },
      (err) => console.error("Messages subscription error:", err)
    );

    // Fetch ride and driver once
    const fetchRideAndDriver = async () => {
      try {
        const rideSnap = await getDoc(doc(firebase.db, "journeys", rideId));
        if (rideSnap.exists()) {
          const rideData = rideSnap.data();
          setRideInfo(rideData);
          const driverSnap = await getDoc(
            doc(firebase.db, "users", rideData.userId)
          );
          if (driverSnap.exists()) {
            setDriver(driverSnap.data());
          }
        }
      } catch (err) {
        console.error("Error loading ride/driver:", err);
      }
    };
    fetchRideAndDriver();

    return unsubscribeMessages;
  }, [rideId, navigation]);

  const handleSend = async (text) => {
    const user = firebase.auth.currentUser;
    if (!user) return;
    try {
      await addDoc(
        collection(firebase.db, "journeys", rideId, "messages"),
        {
          text,
          senderId: user.uid,
          createdAt: serverTimestamp(),
        }
      );
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
        <MessageHeader
          navigation={navigation}
          driver={driver}
          ride={rideInfo}
        />
        <MessageList
          messages={messages}
          driverId={rideInfo?.userId}
        />
      </View>
      <MessageInput onSend={handleSend} />
    </KeyboardAvoidingView>
  );
};

export default MessageScreen;