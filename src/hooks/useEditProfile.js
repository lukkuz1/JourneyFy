import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import firebaseServices from "../services/firebase";

const { db } = firebaseServices;

export const useEditProfile = () => {
  const auth = firebaseServices.auth;
  const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [loading, setLoading] = useState(true);

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
          data.dateOfBirth
            ? data.dateOfBirth.toDate().toISOString().split("T")[0]
            : ""
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
      return;
    }

    try {
      const userRef = doc(db, "users", currentUserId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          firstName,
          lastName,
          phoneNumber,
          dateOfBirth: dateOfBirth
            ? Timestamp.fromDate(new Date(dateOfBirth))
            : null,
        });
      } else {
        await updateDoc(userRef, {
          firstName,
          lastName,
          phoneNumber,
          dateOfBirth: dateOfBirth
            ? Timestamp.fromDate(new Date(dateOfBirth))
            : null,
        });
      }

      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Profile update failed. Check console for details.");
    }
  };

  return {
    firstName,
    lastName,
    phoneNumber,
    dateOfBirth,
    setFirstName,
    setLastName,
    setPhoneNumber,
    setDateOfBirth,
    handleUpdateProfile,
    loading,
    errors,
  };
};
