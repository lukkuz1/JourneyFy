// src/components/RidesHeader.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const RidesHeader = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={24} color={Colors.whiteColor} />
      </TouchableOpacity>
      <Text style={{ ...Fonts.whiteColor20SemiBold, maxWidth: "85%", textAlign: "center" }}>
        My Rides
      </Text>
      <View style={styles.headerIconContainer}>
        <MaterialIcons
          name="account-circle"
          color={Colors.whiteColor}
          size={29}
          onPress={() => navigation.navigate("RideRequestScreen")}
        />
        <View style={styles.badge} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    ...CommonStyles.rowAlignCenter,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.primaryColor,
    padding: Sizes.fixPadding * 2,
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  headerIconContainer: {
    position: "absolute",
    right: 20,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.redColor,
  },
});

export default RidesHeader;