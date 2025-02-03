import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet, Platform } from "react-native";
import { SvgXml } from "react-native-svg";
import { Colors, Fonts, Sizes, CommonStyles } from "../constants/styles";
import Journey from "../screens/Main/Journey";
import Home from "../screens/Main/Home";
import Settings from "../screens/Main/Settings";
import Wallet from "../screens/Main/Wallet";
import HomeScreen from "../screens/Main/home/homeScreen";
import ProfileScreen from "../screens/TemplateProfile/profile/profileScreen";

import {
  home_icon_xml,
  journey_icon_xml,
  settings_icon_xml,
  wallet_icon_xml,
  new_profile_icon_xml
} from "../assets/xml/svg";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Home} />
    </Stack.Navigator>
  );
}

export default function MainNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primaryColor,
        tabBarInactiveTintColor: Colors.grayColor,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color }) => tabSort(route.name, focused, color),
      })}
      initialRouteName="Home"
    >
      <Tab.Screen name="Journeys" component={Journey} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function tabSort(name, focused, color) {
  const icons = {
    Home: home_icon_xml,
    Journeys: journey_icon_xml,
    Wallet: wallet_icon_xml,
    Settings: settings_icon_xml,
    Profile: new_profile_icon_xml,
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ width: 26.0, height: 26.0 }}>
        <SvgXml xml={icons[name]} width="26" height="26" fill={color} />
      </View>
      <Text
        style={
          focused
            ? { ...Fonts.primaryColor14SemiBold }
            : { ...Fonts.grayColor14SemiBold }
        }
      >
        {name}
      </Text>
      {focused ? <View style={styles.selectedTabIndicator}></View> : null}
    </View>
  );
}


const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: Colors.whiteColor,
    borderTopColor: Colors.bodyBackColor,
    borderTopWidth: 1.0,
    height: Platform.OS == "ios" ? 100.0 : 70.0,
    ...CommonStyles.shadow,
  },
  selectedTabIndicator: {
    width: 46.0,
    height: 6.0,
    backgroundColor: Colors.secondaryColor,
    position: "absolute",
    top: -14.0,
  },
});

