// src/components/MessageList.js
import React from "react";
import { View, FlatList } from "react-native";
import { Sizes } from "../../constants/styles";
import MessageItem from "./MessageItem";

const MessageList = ({ messages }) => (
  <View style={{ flex: 1 }}>
    <FlatList
      inverted
      data={messages}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <MessageItem item={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexDirection: "column-reverse",
        paddingBottom: Sizes.fixPadding * 2,
        paddingTop: Sizes.fixPadding * 2,
      }}
    />
  </View>
);

export default MessageList;