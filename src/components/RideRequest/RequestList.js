// src/components/RequestList.js
import React from "react";
import { FlatList } from "react-native";
import { Sizes } from "../../constants/styles";
import RequestItem from "./RequestItem";

const RequestList = ({ requests, onRequestPress, navigation }) => {
  const renderItem = ({ item }) => (
    <RequestItem
      item={item}
      onPress={() => navigation.push("StartRide")}
      onRequestSheetPress={() => onRequestPress(item.requestCount)}
    />
  );

  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2 }}
    />
  );
};

export default RequestList;
