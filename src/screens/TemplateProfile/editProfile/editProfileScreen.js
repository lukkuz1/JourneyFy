import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Sizes, Fonts, CommonStyles } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import firebaseServices from "../../../services/firebase";
import ProfileInputField, {
  validateName,
  validatePhoneNumber,
  validateDateOfBirth,
} from "../../../components/Profile/ProfileInputField";

const { db } = firebaseServices;

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
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      if (!currentUserId) return;

      const userRef = doc(db, "users", currentUserId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setPhoneNumber(data.phoneNumber || "");
        setDateOfBirth(
          data.dateOfBirth ? data.dateOfBirth.toDate().toISOString().split("T")[0] : ""
        );
      } else {
        await setDoc(userRef, {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          dateOfBirth: null,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setLoading(false);
  };



  const handleUpdateProfile = async () => {
    if (!currentUserId) {
      Alert.alert("Error", "User not authenticated.");
      console.log("🚨 No user ID found");
      return;
    }
  
    // Validate fields before updating
    const newErrors = {
      firstName: validateName(firstName),
      lastName: validateName(lastName),
      phoneNumber: validatePhoneNumber(phoneNumber),
      dateOfBirth: validateDateOfBirth(dateOfBirth),
    };
  
    setErrors(newErrors);
    console.log("🔍 Validation Errors:", newErrors);
  
    // Check if there are validation errors
    if (Object.values(newErrors).some((error) => error)) {
      Alert.alert("Validation Error", "Please fix the errors before updating.");
      console.log("❌ Validation failed, stopping update.");
      return;
    }
  
    try {
      console.log("🔥 Starting update...");
  
      const userRef = doc(db, "users", currentUserId);
      const userDoc = await getDoc(userRef);
  
      if (!userDoc.exists()) {
        console.log("📄 User document not found, creating one.");
        await setDoc(userRef, {
          firstName,
          lastName,
          phoneNumber,
          dateOfBirth: dateOfBirth ? Timestamp.fromDate(new Date(dateOfBirth)) : null,
        });
      } else {
        console.log("📌 Updating existing user document.");
        await updateDoc(userRef, {
          firstName,
          lastName,
          phoneNumber,
          dateOfBirth: dateOfBirth ? Timestamp.fromDate(new Date(dateOfBirth)) : null,
        });
      }
  
      Alert.alert("Success", "Profile updated successfully!");
      console.log("✅ Profile updated:", { firstName, lastName, phoneNumber, dateOfBirth });
  
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      Alert.alert("Error", "Profile update failed. Check console for details.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.primaryColor} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <Header title={"Redaguoti Profilį"} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {profilePic()}
        <ProfileInputField label="Vardas" value={firstName} setter={setFirstName} validate={validateName} />
        <ProfileInputField label="Pavardė" value={lastName} setter={setLastName} validate={validateName} />
        <ProfileInputField label="Telefonas" value={phoneNumber} setter={setPhoneNumber} keyboardType="phone-pad" validate={validatePhoneNumber} />
        <ProfileInputField label="Gimimo data" value={dateOfBirth} setter={setDateOfBirth} keyboardType="default" validate={validateDateOfBirth} />
      </ScrollView>
      {updateButton()}
    </View>
  );

  function profilePic() {
    return (
      <View style={styles.profilePicWrapper}>
        <Image
          source={require("../../../assets/images/user/user1.jpeg")}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <TouchableOpacity style={styles.changePhotoCircleWrapper}>
          <Ionicons name="camera-outline" color={Colors.secondaryColor} size={20} />
        </TouchableOpacity>
      </View>
    );
  }

  function updateButton() {
    return (
      <TouchableOpacity
        style={{ ...CommonStyles.button, margin: Sizes.fixPadding * 2 }}
        onPress={handleUpdateProfile}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Atnaujinti</Text>
      </TouchableOpacity>
    );
  }
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  profilePicWrapper: {
    alignItems: "center",
    margin: Sizes.fixPadding * 3,
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
