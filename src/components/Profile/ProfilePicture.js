import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Sizes } from "../../constants/styles";

const ProfilePicture = () => (
  <View style={styles.profilePicWrapper}>
    <Image
      source={require("../../assets/images/user/user1.jpeg")}
      style={styles.profileImage}
    />
    <TouchableOpacity style={styles.changePhotoCircleWrapper}>
      <Ionicons name="camera-outline" color={Colors.secondaryColor} size={20} />
    </TouchableOpacity>
  </View>
);

export default ProfilePicture;

const styles = StyleSheet.create({
  profilePicWrapper: {
    alignItems: "center",
    margin: Sizes.fixPadding * 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePhotoCircleWrapper: {
    position: "absolute",
    right: -5,
    bottom: -5,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.bodyBackColor,
    alignItems: "center",
    justifyContent: "center",
  },
});
