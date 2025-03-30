import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Colors, Sizes, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";

const Header = ({ userEmail }) => {
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../../assets/images/user/user1.jpeg")}
          style={{ width: 45, height: 45, borderRadius: 22.5 }}
        />
        <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
          <Text numberOfLines={1} style={Fonts.whiteColor16SemiBold}>
            Labas, {userEmail}
          </Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={Colors.whiteColor} />
            <Text numberOfLines={1} style={styles.locationText}>
              Lietuva
            </Text>
          </View>
        </View>
        <Ionicons name="notifications-outline" size={22} color={Colors.whiteColor} onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primaryColor,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding * 2,
    paddingVertical: Sizes.fixPadding + 5,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Sizes.fixPadding - 7,
  },
  locationText: {
    flex: 1,
    ...Fonts.whiteColor14Medium,
    marginLeft: Sizes.fixPadding - 5,
  },
});

export default Header;
