import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import { SvgXml } from "react-native-svg";
import Journey from "../screens/Main/Journey";
import Home from "../screens/Main/Home";
import Settings from "../screens/Main/Settings";
import Chat from "../screens/Main/Chat";
import {
  home_icon_xml,
  journey_icon_xml,
  settings_icon_xml,
  chat_icon_xml,
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
        tabBarStyle: {
          backgroundColor: Colors.LightBlue,
          height: 80,
        },
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          height: 0,
        },
        tabBarActiveTintColor: Colors.EntryLighterWhite,
        tabBarInactiveTintColor: Colors.Black,
        tabBarIcon: ({ color }) => {
          switch (route.name) {
            case "Home":
              return (
                <SvgXml
                  xml={home_icon_xml}
                  width="40"
                  height="40"
                  fill={color}
                />
              );
            case "Journey":
              return (
                <SvgXml
                  xml={journey_icon_xml}
                  width="40"
                  height="40"
                  fill={color}
                />
              );
            case "Settings":
              return (
                <SvgXml
                  xml={settings_icon_xml}
                  width="40"
                  height="40"
                  fill={color}
                />
              );
            case "Chat":
              return (
                <SvgXml
                  xml={chat_icon_xml}
                  width="40"
                  height="40"
                  fill={color}
                />
              );
            default:
              return null;
          }
        },
        tabBarIconStyle: {
          marginBottom: 10,
        },
      })}
      initialRouteName="Home"
    >
      <Tab.Screen name="Journey" component={Journey} />
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
