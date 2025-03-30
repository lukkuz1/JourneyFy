import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useUserProfile } from "../../hooks/useUserProfile";

const ProfileSection = () => {
  const { user, fetchUserProfile } = useUserProfile();
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // Fetch profile data when the component mounts
    fetchUserProfile();
  }, []);

  useEffect(() => {
    // Update fullName when user data changes
    if (user.firstName || user.lastName) {
      setFullName(`${user.firstName} ${user.lastName}`.trim());
    }
  }, [user]);

  return (
    <View style={styles.profileSection}>
      <Image
        source={
          user.photoURL
            ? { uri: user.photoURL }
            : require("../../assets/images/user/user1.jpeg")
        }
        style={styles.profileImage}
      />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{fullName}</Text>
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
});

export default ProfileSection;
