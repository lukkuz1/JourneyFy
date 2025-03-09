import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/TemplateProfile/profile/profileScreen";
import EditProfileScreen from "../screens/TemplateProfile/editProfile/editProfileScreen";
import CustomerSupportScreen from "../screens/TemplateProfile/customerSupport/customerSupportScreen";
import TermsAndConditionsScreen from "../screens/TemplateProfile/termsAndConditions/termsAndConditionsScreen";
import UserVehiclesScreen from "../screens/TemplateProfile/userVehicles/userVehiclesScreen";
import RideHistoryScreen from "../screens/TemplateProfile/rideHistory/rideHistoryScreen";
import PrivacyPolicyScreen from "../screens/TemplateProfile/privacyPolicy/privacyPolicyScreen";
import FaqScreen from "../screens/TemplateProfile/faq/faqScreen";

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
      initialRouteName="Profile"
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen
        name="CustomerSupportScreen"
        component={CustomerSupportScreen}
      />
      <Stack.Screen
        name="TermsAndConditionsScreen"
        component={TermsAndConditionsScreen}
      />
            <Stack.Screen
        name="UserVehiclesScreen"
        component={UserVehiclesScreen}
      />
            <Stack.Screen
        name="RideHistoryScreen"
        component={RideHistoryScreen}
      />
            <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
            <Stack.Screen
        name="FaqScreen"
        component={FaqScreen}
      />
    </Stack.Navigator>
  );
}
