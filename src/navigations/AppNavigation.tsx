import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./MainNavigation";
import EntryNavigation from "../navigations/EntryNavigation";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";

const Stack = createStackNavigator();

export default function AppNavigation() {
  const auth = useAuth();
  const user = useUser();

  return (
    <NavigationContainer>
      {auth.loggedIn &&
      user.initialized /* && firebase.auth.currentUser.emailVerified */ ? (
        <MainNavigation />
      ) : (
        <EntryNavigation />
      )}
    </NavigationContainer>
  );
}
