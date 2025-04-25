// src/components/RideDetail/PassengerDetail.js
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Sizes, Fonts, Colors } from "../../constants/styles";

const PassengerDetail = ({ passengers }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={passengers}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.passengerRow}>
            <Text style={Fonts.blackColor14Medium}>{item}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        scrollEnabled={false}       // disable inner scrolling
        nestedScrollEnabled={true}  // allow nested scrolling
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
  },
  passengerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding / 2,
    paddingHorizontal: Sizes.fixPadding,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: Sizes.fixPadding / 2,
  },
});

export default PassengerDetail;