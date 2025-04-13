// src/components/PassengerDetail.js
import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const defaultPassengerList = [
  {
    id: "1",
    profile: require("../../assets/images/user/user10.png"),
    name: "Savannah Nguyen",
  },
  {
    id: "2",
    profile: require("../../assets/images/user/user1.jpeg"),
    name: "Brooklyn Simmons",
  },
];

const PassengerDetail = ({ passengers }) => {
  const list = passengers || defaultPassengerList;
  const renderItem = ({ item }) => (
    <View style={{ alignItems: "center", maxWidth: 72, marginHorizontal: Sizes.fixPadding * 2 }}>
      <Image
        source={item.profile}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <Text
        numberOfLines={2}
        style={{ ...Fonts.blackColor14Medium, textAlign: "center", marginTop: Sizes.fixPadding }}
      >
        {item.name}
      </Text>
    </View>
  );

  return (
    <View style={{ backgroundColor: Colors.whiteColor, marginVertical: Sizes.fixPadding * 2, paddingTop: Sizes.fixPadding + 5, paddingBottom: Sizes.fixPadding * 2 }}>
      <View style={{ marginHorizontal: Sizes.fixPadding * 2, marginBottom: Sizes.fixPadding * 1.5 }}>
        <Text style={{ ...Fonts.secondaryColor17SemiBold }}>Keleiviai</Text>
        <Text style={{ ...Fonts.grayColor16Medium, marginTop: Sizes.fixPadding - 7 }}>
          {list.length} seat booked
        </Text>
      </View>
      <FlatList
        data={list}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default PassengerDetail;
