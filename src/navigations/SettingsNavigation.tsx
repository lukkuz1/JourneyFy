import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../screens/Main/Settings";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function SettingsNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        presentation: "modal",
      }}
      initialRouteName="Settings"
    >
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
