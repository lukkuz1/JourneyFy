// src/components/EndRide/PassengerList.js
import React from "react";
import { FlatList, View, Image, Text } from "react-native";
import { Fonts, Sizes } from "../../constants/styles";

const PassengerList = ({ passengersList }) => {
  if (!passengersList?.length) return null;

  return (
    <FlatList
      data={passengersList}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2 }}
      renderItem={({ item }) => (
        <View
          style={{
            alignItems: "center",
            width: 70,
            marginRight: Sizes.fixPadding * 1.4,
          }}
        >
          <Image
            source={
              item.photoURL
                ? { uri: item.photoURL }
                : require("../../assets/images/user/user9.png")
            }
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <Text
            style={{
              ...Fonts.grayColor12Medium,
              textAlign: "center",
              marginTop: Sizes.fixPadding - 5,
            }}
          >
            {item.firstName} {item.lastName}
          </Text>
        </View>
      )}
    />
  );
};

export default PassengerList;