// src/components/RideHistoryList.js
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Sizes } from "../../constants/styles";
import RideHistoryItem from "./RideHistoryItem";

const RideHistoryList = ({ rides, navigation }) => {
  const renderItem = ({ item }) => <RideHistoryItem item={item} navigation={navigation} />;
  return (
    <FlatList
      data={rides}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2 }}
    />
  );
};

export default RideHistoryList;
