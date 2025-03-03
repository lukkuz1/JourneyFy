import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./MainNavigation";
import EntryNavigation from "../navigations/EntryNavigation";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";

export default function AppNavigation() {
  const auth = useAuth();
  const user = useUser();

  if (!auth || !user) {
    return null;
  }
  

  return (
    <NavigationContainer>
      {auth.loggedIn && user.initialized ? <MainNavigation /> : <EntryNavigation />}
    </NavigationContainer>
  );
  
}
