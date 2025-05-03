import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import { Colors } from "../../../constants/styles";
import MessageHeader from "../../../components/Message/MessageHeader";
import MessageList from "../../../components/Message/MessageList";
import MessageInput from "../../../components/Message/MessageInput";
import useMessages from "../../../hooks/useMessages";
import useRideAndDriver from "../../../hooks/useRideAndDriver";
import firebase from "../../../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const MessageScreen = ({ navigation, route }) => {
  const { rideId } = route.params;
  const messages = useMessages(rideId);
  const [rideInfo, driver] = useRideAndDriver(rideId);

  const handleSend = async (text) => {
    const user = firebase.auth.currentUser;
    if (!user) return;
    try {
      await addDoc(collection(firebase.db, "journeys", rideId, "messages"), {
        text,
        senderId: user.uid,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Send message error:", e);
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
        <MessageList messages={messages} driverId={rideInfo?.userId} />
      </View>
      <MessageInput onSend={handleSend} />
    </KeyboardAvoidingView>
  );
};

export default MessageScreen;
