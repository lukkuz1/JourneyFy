import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet, Platform } from "react-native";
import { SvgXml } from "react-native-svg";
import { Colors, Fonts, Sizes, CommonStyles } from "../constants/styles";
import HomeNavigation from "./HomeNavigation";
import ProfileNavigation from "./ProfileNavigation";
import JourneyNavigation from "./JourneyNavigation";
import WalletNavigation from "./WalletNavigation";

import {
  home_icon_xml,
  journey_icon_xml,
  settings_icon_xml,
  wallet_icon_xml,
  new_profile_icon_xml,
} from "../assets/xml/svg";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
      <Tab.Screen name="Home" component={HomeNavigation} />
      <Tab.Screen name="Wallet" component={WalletNavigation} />
      <Tab.Screen name="Journey" component={JourneyNavigation} />
      {/* <Tab.Screen name="Settings" component={Settings} /> */}
      <Tab.Screen name="Profile" component={ProfileNavigation} />
    </Tab.Navigator>
  );
}

function tabSort(name, focused, color) {
  const icons = {
    Home: home_icon_xml,
    Journey: journey_icon_xml,
    Wallet: wallet_icon_xml,
    // Settings: settings_icon_xml,
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
