import { useState } from "react";
import { Alert } from "react-native";
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export const usePasswordChange = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = getAuth();

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }
    if (newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return false;
    }
    try {
      await updatePassword(auth.currentUser, newPassword);
      Alert.alert("Success", "Password changed successfully");
      return true;
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        Alert.alert(
          "Reauthentication Required",
          "Please log in again or reauthenticate to change your password."
        );
      } else {
        Alert.alert("Error", "Failed to change password");
      }
      console.error("Error changing password:", error);
      return false;
    }
  };

  return { newPassword, confirmPassword, setNewPassword, setConfirmPassword, handlePasswordChange };
};
