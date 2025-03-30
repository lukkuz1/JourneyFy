import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const ProfileSection = ({ currentUser }) => {
  return (
    <View style={styles.profileSection}>
      <Image
        source={
          currentUser?.photoURL
            ? { uri: currentUser.photoURL }
            : require("../../assets/images/user/user1.jpeg")
        }
        style={styles.profileImage}
      />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>
          {currentUser?.displayName || "Naudotojas"}
        </Text>
        <Text style={styles.profileEmail}>{currentUser?.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.whiteColor,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileInfo: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.grayColor,
  },
});

export default ProfileSection;
