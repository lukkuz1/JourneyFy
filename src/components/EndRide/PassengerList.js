// src/components/PassengerList.js
import React from "react";
import { FlatList, View, Image, Text } from "react-native";
import { Fonts, Sizes } from "../../constants/styles";

const PassengerList = ({ passengersList }) => {
  const renderItem = ({ item }) => (
    <View
      style={{
        alignItems: "center",
        width: 70.0,
        marginHorizontal: Sizes.fixPadding * 1.4,
      }}
    >
      <Image
        source={item.profile}
        style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
      />
      <Text
        style={{
          ...Fonts.grayColor12Medium,
          textAlign: "center",
          marginTop: Sizes.fixPadding - 5.0,
        }}
      >
        {item.name}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={passengersList}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default PassengerList;