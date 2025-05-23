import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Image, StyleSheet } from "react-native";
import { Colors, Sizes, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useUserProfile } from "../../hooks/useUserProfile";
import { getAuth } from "firebase/auth";

const Header = ({ location = "Lietuva" }) => {
  const { user, fetchUserProfile, refreshing, onRefresh } = useUserProfile();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [userName, setUserName] = useState("Naudotojas");

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
    }, [])
  );
  useEffect(() => {
    if (user.firstName || user.lastName) {
      setUserName(`${user.firstName} ${user.lastName}`.trim());
    }
  }, [user]);

  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={
            user?.photoURL
              ? { uri: user.photoURL }
              : require("../../assets/images/user/user1.jpeg")
          }
          style={styles.profileImage}
        />
        <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
          <Text numberOfLines={1} style={Fonts.whiteColor16SemiBold}>
            Labas, {userName}
          </Text>
          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={14}
              color={Colors.whiteColor}
            />
            <Text numberOfLines={1} style={styles.locationText}>
              {location}
            </Text>
          </View>
        </View>
        <Ionicons
          name="notifications-outline"
          size={22}
          color={Colors.whiteColor}
          onPress={() => {}}
        />
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
  profileImage: {
    width: 40.0,
    height: 40.0,
    borderRadius: 35.0,
  },
});

export default Header;
