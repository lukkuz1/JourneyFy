import { useState } from "react";
import { Alert } from "react-native";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

export const usePasswordChange = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = getAuth();

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Klaida", "Slaptažodžiai nesutampa");
      return false;
    }
    if (newPassword.length < 6) {
      Alert.alert("Klaida", "Slaptažodį turi sudaryti bent 6 simboliai");
      return false;
    }
    try {
      await updatePassword(auth.currentUser, newPassword);
      Alert.alert("Sekmės pranešimas", "Slaptažodis pakeistas sėkmingai");
      return true;
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        Alert.alert(
          "Reikalingas pakartotinis autentifikavimas",
          "Prisijunkite dar kartą arba patvirtinkite savo tapatybę, kad pakeistumėte slaptažodį."
        );
      } else {
        Alert.alert("Klaida", "Nepavyko pakeisti slaptažodžio");
      }
      console.error("Error changing password:", error);
      return false;
    }
  };

  return {
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    handlePasswordChange,
  };
};
