import React from "react";
import { FlatList } from "react-native";
import { Sizes } from "../../constants/styles";
import RequestItem from "./RequestItem";

const RequestList = ({ requests, onRequestPress, navigation }) => {
  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RequestItem
          item={item}
          onPress={() => navigation.navigate("StartRideScreen", { ride: item })}
          onRequestSheetPress={() => onRequestPress(item)}
        />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2 }}
    />
  );
};

export default RequestList;
