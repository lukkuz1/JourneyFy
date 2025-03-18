import React, { useEffect } from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./MainNavigation";
import EntryNavigation from "../navigations/EntryNavigation";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import { getAuth, sendEmailVerification } from "firebase/auth";

export default function AppNavigation() {
  const auth = useAuth();
  const firebaseAuth = getAuth();
  const user = useUser();

  if (!auth || !user) {
    return null;
  }

  const currentUser = firebaseAuth.currentUser;
  const emailVerified = currentUser ? currentUser.emailVerified : false;

  useEffect(() => {
    if (currentUser && !emailVerified) {
      Alert.alert(
        "Reikalingas el. pašto patvirtinimas",
        "Prašome patvirtinti savo el. paštą.",
        [
          { text: "Gerai" },
          {
            text: "Persiųsti el. pašto patvirtinimą",
            onPress: async () => {
              await sendEmailVerification(currentUser);
              Alert.alert(
                "Verifikacijos žinutė išsiųsta į e. paštą",
                "Patikrinkite savo el. paštą."
              );
            },
          },
        ]
      );
    }
  }, [currentUser, emailVerified]);

  return (
    <NavigationContainer>
      {!auth.loggedIn || !user.initialized || !currentUser.emailVerified ? (
        <EntryNavigation />
      ) : (
        <MainNavigation />
      )}
    </NavigationContainer>
  );
}
