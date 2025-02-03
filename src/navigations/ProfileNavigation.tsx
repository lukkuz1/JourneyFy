import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/TemplateProfile/profile/profileScreen";
import EditProfileScreen from "../screens/TemplateProfile/editProfile/editProfileScreen";
import CustomerSupportScreen from "../screens/TemplateProfile/customerSupport/customerSupportScreen";
import TermsAndConditionsScreen from "../screens/TemplateProfile/termsAndConditions/termsAndConditionsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default function ProfileNavigation() {
    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
            presentation: "modal",
          }}
          initialRouteName="ProfileScreen"
        >
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
          <Stack.Screen name="CustomerSupportScreen" component={CustomerSupportScreen} />
          <Stack.Screen name="EditProfileScreen" component={TermsAndConditionsScreen} />
        </Stack.Navigator>
      );
}
