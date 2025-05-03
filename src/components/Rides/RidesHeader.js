import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const RidesHeader = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <Text
        style={{
          ...Fonts.whiteColor20SemiBold,
          maxWidth: "85%",
          textAlign: "center",
        }}
      >
        Mano kelionės
      </Text>
      <View style={styles.headerIconContainer}>
        <MaterialIcons
          name="account-circle"
          color={Colors.whiteColor}
          size={29}
          onPress={() => navigation.push("RideRequestScreen")}
        />
        <View style={styles.badge} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    ...CommonStyles.rowAlignCenter,
    justifyContent: "center",
    backgroundColor: Colors.primaryColor,
    padding: Sizes.fixPadding * 2,
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
