import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import FaqScreen from "../screens/TemplateProfile/faq/faqScreen";
import PrivacyPolicyScreen from "../screens/TemplateProfile/privacyPolicy/privacyPolicyScreen";
import ReviewsScreen from "../screens/TemplateAdditional/reviews/reviewsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function AdditionalNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        presentation: "modal",
      }}
      initialRouteName="FaqScreen"
    >
      <Stack.Screen name="FaqScreen" component={FaqScreen} />
      {/* <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
          <Stack.Screen name="ReviewsScreen" component={ReviewsScreen} /> */}
    </Stack.Navigator>
  );
}
