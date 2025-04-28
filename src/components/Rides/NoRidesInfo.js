// src/components/NoRidesInfo.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const NoRidesInfo = () => {
  return (
    <View style={styles.emptyPage}>
      <Image
        source={require("../../assets/images/empty_ride.png")}
        style={{ width: 50, height: 50, resizeMode: "contain" }}
      />
      <Text style={{ ...Fonts.grayColor16SemiBold, marginTop: Sizes.fixPadding }}>
        Tuščias kelionių sąrašas
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: Sizes.fixPadding * 2,
  },
});

export default NoRidesInfo;