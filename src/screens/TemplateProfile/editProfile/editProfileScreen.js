import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

import { Colors, Sizes, Fonts, CommonStyles } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import ProfileInputField, {
  validateName,
  validatePhoneNumber,
  validateDateOfBirth,
} from "../../../components/Profile/ProfileInputField";
import LoadingIndicator from "../../../components/LoadingIndicator";
import ProfilePicture from "../../../components/Profile/ProfilePicture";
import UpdateButton from "../../../components/Profile/UpdateButton";
import {
  fetchUserProfile,
  initializeUserProfile,
  updateProfileInFirestore,
} from "../../../services/firebaseUserService";

const EditProfileScreen = ({ navigation }) => {
  const auth = getAuth();
  const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    fetchUserProfile(currentUserId, populateUserData, initializeUserProfile).finally(() =>
      setLoading(false)
    );
  }, []);

  const populateUserData = (data) => {
    setFirstName(data.firstName || "");
    setLastName(data.lastName || "");
    setPhoneNumber(data.phoneNumber || "");
    setDateOfBirth(
      data.dateOfBirth ? data.dateOfBirth.toDate().toISOString().split("T")[0] : ""
    );
  };

  const handleUpdateProfile = async () => {
    if (!currentUserId) {
      Alert.alert("Error", "User not authenticated.");
      console.log("🚨 No user ID found");
      return;
    }

    const validationErrors = validateFields();
    if (Object.values(validationErrors).some((error) => error)) {
      Alert.alert("Validation Error", "Please fix the errors before updating.");
      console.log("❌ Validation failed, stopping update.");
      return;
    }

    try {
      console.log("🔥 Starting update...");
      await updateProfileInFirestore(currentUserId, {
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth: dateOfBirth ? Timestamp.fromDate(new Date(dateOfBirth)) : null,
      });
      Alert.alert("Success", "Profile updated successfully!");
      console.log("✅ Profile updated:", { firstName, lastName, phoneNumber, dateOfBirth });
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      Alert.alert("Error", "Profile update failed. Check console for details.");
    }
  };

  const validateFields = () => {
    const newErrors = {
      firstName: validateName(firstName),
      lastName: validateName(lastName),
      phoneNumber: validatePhoneNumber(phoneNumber),
      dateOfBirth: validateDateOfBirth(dateOfBirth),
    };

    setErrors(newErrors);
    console.log("🔍 Validation Errors:", newErrors);
    return newErrors;
  };

  if (loading) return <LoadingIndicator />;

  return (
    <View style={styles.container}>
      <MyStatusBar />
      <Header title={"Redaguoti Profilį"} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfilePicture />
        <ProfileInputField
          label="Vardas"
          value={firstName}
          setter={setFirstName}
          validate={validateName}
        />
        <ProfileInputField
          label="Pavardė"
          value={lastName}
          setter={setLastName}
          validate={validateName}
        />
        <ProfileInputField
          label="Telefonas"
          value={phoneNumber}
          setter={setPhoneNumber}
          keyboardType="phone-pad"
          validate={validatePhoneNumber}
        />
        <ProfileInputField
          label="Gimimo data"
          value={dateOfBirth}
          setter={setDateOfBirth}
          keyboardType="default"
          validate={validateDateOfBirth}
        />
      </ScrollView>
      <UpdateButton onPress={handleUpdateProfile} />
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bodyBackColor,
  },
});
