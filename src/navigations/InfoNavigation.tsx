import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationsScreen from "../screens/TemplateInfo/notifications/notificationsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default function InfoNavigation() {
    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
            presentation: "modal",
          }}
          initialRouteName="NotificationsScreen"
        >
          <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />


        </Stack.Navigator>
      );
}
