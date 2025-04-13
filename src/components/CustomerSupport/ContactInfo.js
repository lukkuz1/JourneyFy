// src/components/ContactInfo.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Colors, screenWidth, Fonts, Sizes } from "../../constants/styles";

const ContactInfo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/customer_support.png")}
        style={{
          width: screenWidth / 4.5,
          height: screenWidth / 4.5,
          resizeMode: "contain",
        }}
      />
      <Text style={{ ...Fonts.blackColor18SemiBold, marginTop: Sizes.fixPadding * 2 }}>
        Susitikime
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: Sizes.fixPadding * 3,
  },
});

export default ContactInfo;
