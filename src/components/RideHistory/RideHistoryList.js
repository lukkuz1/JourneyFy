import React from "react";
import { FlatList } from "react-native";
import { Sizes } from "../../constants/styles";
import RideHistoryItem from "./RideHistoryItem";

const RideHistoryList = ({ rides, navigation }) => (
  <FlatList
    data={rides}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <RideHistoryItem item={item} navigation={navigation} />
    )}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2 }}
  />
);

export default RideHistoryList;
