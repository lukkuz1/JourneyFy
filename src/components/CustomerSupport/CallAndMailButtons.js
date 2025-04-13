// src/components/CallAndMailButtons.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const CallAndMailButtons = () => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Ionicons name="call-outline" color={Colors.primaryColor} size={20} />
        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.primaryColor16SemiBold }}>
          Paskambinkite mums
        </Text>
      </View>
      <View style={styles.button}>
        <Ionicons name="mail-outline" color={Colors.primaryColor} size={20} />
        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.primaryColor16SemiBold }}>
          Parašykite mums
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding,
  },
  button: {
    flex: 1,
    ...CommonStyles.shadow,
    ...CommonStyles.rowAlignCenter,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding + 5,
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding,
  },
});

export default CallAndMailButtons;
