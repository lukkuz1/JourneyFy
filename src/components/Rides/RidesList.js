import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Sizes } from "../../constants/styles";
import RideItem from "./RideItem";

const RidesList = ({ rides, navigation }) => {
  const renderItem = ({ item }) => (
    <RideItem item={item} navigation={navigation} />
  );
  return (
    <FlatList
      data={rides}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2 }}
    />
  );
};

export default RidesList;
