import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import { SvgXml } from "react-native-svg";
import Journey from "../screens/Main/Journey";
import Home from "../screens/Main/Home";
import { RootStackParamList } from "../navigations/navigation";
import Settings from "../screens/Main/Settings";
import Chat from "../screens/Main/Chat";
import { home_icon_xml } from "../assets/xml/svg";
import { journey_icon_xml } from "../assets/xml/svg";
import { settings_icon_xml } from "../assets/xml/svg";
import { chat_icon_xml } from "../assets/xml/svg";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

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
      tabBarPosition={"bottom"}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.LightBlue,
          borderRadius: 10,
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 15,
          height: 66,
          borderTopWidth: 0,
          elevation: 5,
        },
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          height: 0,
        },
        tabBarActiveTintColor: Colors.EntryLighterWhite,
        tabBarInactiveTintColor: Colors.Black,
        tabBarIcon: ({ color }) => {
          if (route.name === "Home")
            return (
              <SvgXml xml={home_icon_xml} width="40" height="40" fill={color} />
            );
          else if (route.name === "Journey")
            return (
              <SvgXml
                xml={journey_icon_xml}
                width="40"
                height="40"
                fill={color}
              />
            );
          else if (route.name === "Settings")
            return (
              <SvgXml
                xml={settings_icon_xml}
                width="40"
                height="40"
                fill={color}
              />
            );
          else if (route.name === "Chat")
            return (
              <SvgXml xml={chat_icon_xml} width="40" height="40" fill={color} />
            );
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
