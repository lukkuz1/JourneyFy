import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const WalletHeader = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={{ ...Fonts.whiteColor20SemiBold }}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primaryColor,
    padding: Sizes.fixPadding * 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WalletHeader;
