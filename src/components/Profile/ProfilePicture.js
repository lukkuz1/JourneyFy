// src/components/Profile/ProfilePicture.js
import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Colors, Sizes } from "../../constants/styles";

const ProfilePicture = ({ currentUser, profilePhoto, onProfileUpdated }) => {
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Leidimas atmestas", "Būtinas leidimas patekti į galeriją!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      await uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      setUploading(true);
      const response = await fetch(uri);
      const blob = await response.blob();
      const auth = getAuth();
      const storage = getStorage();
      const userId = auth.currentUser.uid;
      const storageReference = ref(storage, `profilePictures/${userId}/profile.jpg`);
      await uploadBytes(storageReference, blob);
      const downloadURL = await getDownloadURL(storageReference);
      onProfileUpdated && onProfileUpdated(downloadURL);
      Alert.alert("Sekmės pranešimas", "Profilio nuotrauka atnaujinta!");
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Įkėlimo klaida", "Nepavyko atnaujinti profilio nuotraukos.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.profilePicWrapper}>
      {uploading ? (
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      ) : (
        <>
          <Image
            source={profilePhoto ? { uri: profilePhoto } : require("../../assets/images/user/user1.jpeg")}
            style={styles.profilePicture}
          />
          <TouchableOpacity style={styles.changePhotoCircleWrapper} onPress={pickImage}>
            <Ionicons name="camera-outline" color={Colors.secondaryColor} size={20} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profilePicWrapper: {
    alignItems: "center",
    margin: Sizes.fixPadding * 3,
  },
  profilePicture: {
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

export default ProfilePicture;