import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
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
  const [isDateOfBirthSet, setIsDateOfBirthSet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  const [profilePhoto, setProfilePhoto] = useState(
    auth.currentUser?.photoURL || ""
  );

  useEffect(() => {
    fetchUserProfile(
      currentUserId,
      populateUserData,
      initializeUserProfile
    ).finally(() => setLoading(false));
  }, []);

  const populateUserData = (data) => {
    setFirstName(data.firstName || "");
    setLastName(data.lastName || "");
    setPhoneNumber(data.phoneNumber || "");
    if (data.dateOfBirth) {
      setDateOfBirth(data.dateOfBirth.toDate().toISOString().split("T")[0]);
      setIsDateOfBirthSet(true);
    }
    if (data.photoURL) {
      setProfilePhoto(data.photoURL);
    }
  };

  const handleUpdateProfile = async () => {
    if (!currentUserId) {
      Alert.alert("Klaida", "Vartotojas neautentifikuotas.");
      return;
    }
    const validationErrors = validateFields();
    if (Object.values(validationErrors).some((error) => error)) {
      Alert.alert("Validacijos klaida", "Prieš atnaujindami, ištaisykite klaidas.");
      return;
    }
    const updateData = {
      firstName,
      lastName,
      phoneNumber,
    };
    if (!isDateOfBirthSet && dateOfBirth) {
      updateData.dateOfBirth = Timestamp.fromDate(new Date(dateOfBirth));
    }
    if (profilePhoto) {
      updateData.photoURL = profilePhoto;
    }
    try {
      await updateProfileInFirestore(currentUserId, updateData);
      Alert.alert("Sekmės pranešimas", "Profilis sėkmingai atnaujintas!");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Klaidos pranešimas", "Profilio atnaujinimas nepavyko.");
    }
  };

  const validateFields = () => {
    const newErrors = {
      firstName: validateName(firstName),
      lastName: validateName(lastName),
      phoneNumber: validatePhoneNumber(phoneNumber),
      dateOfBirth: isDateOfBirthSet ? "" : validateDateOfBirth(dateOfBirth),
    };
    setErrors(newErrors);
    return newErrors;
  };

  if (loading) return <LoadingIndicator />;

  return (
    <View style={styles.container}>
      <MyStatusBar />
      <Header title={"Redaguoti Profilį"} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfilePicture
          currentUser={auth.currentUser}
          profilePhoto={profilePhoto}
          onProfileUpdated={(newURL) => {
            setProfilePhoto(newURL);
          }}
        />
        <ProfileInputField
          label="Vardas"
          value={firstName}
          setter={setFirstName}
          validate={validateName}
          placeholder="Įveskite savo vardą"
        />
        <ProfileInputField
          label="Pavardė"
          value={lastName}
          setter={setLastName}
          validate={validateName}
          placeholder="Įveskite savo pavardę"
        />
        <ProfileInputField
          label="Telefonas"
          value={phoneNumber}
          setter={setPhoneNumber}
          keyboardType="phone-pad"
          validate={validatePhoneNumber}
          placeholder="+370123456789"
        />
        {!isDateOfBirthSet && (
          <ProfileInputField
            label="Gimimo data"
            value={dateOfBirth}
            setter={setDateOfBirth}
            keyboardType="default"
            validate={validateDateOfBirth}
            placeholder="YYYY-MM-DD"
          />
        )}
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
