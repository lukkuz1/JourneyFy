import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors, Fonts, Sizes, CommonStyles } from "../constants/styles";
import { View, StyleSheet, Text, BackHandler, Platform } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import RidesScreen from "../screens/rides/ridesScreen";
import WalletScreen from "../screens/wallet/walletScreen";
import HomeScreen from "../screens/home/homeScreen";
import ProfileScreen from "../screens/profile/profileScreen";

const Tab = createBottomTabNavigator();

const BottomTabBarScreen = ({ navigation }) => {
  const backAction = () => {
    if (Platform.OS === "ios") {
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      });
    } else {
      backClickCount == 1 ? BackHandler.exitApp() : _spring();
      return true;
    }
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      navigation.addListener("gestureEnd", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
        navigation.removeListener("gestureEnd", backAction);
      };
    }, [backAction])
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors.primaryColor,
          tabBarInactiveTintColor: Colors.grayColor,
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused, color }) =>
              tabSort({
                focused,
                color,
                icon: "home-outline",
                tab: "Home",
                isRotate: false,
              }),
          }}
        />
        <Tab.Screen
          name="Rides"
          component={RidesScreen}
          options={{
            tabBarIcon: ({ focused, color }) =>
              tabSort({
                focused,
                color,
                icon: "navigate-outline",
                tab: "My rides",
                isRotate: true,
              }),
          }}
        />
        <Tab.Screen
          name="Wallet"
          component={WalletScreen}
          options={{
            tabBarIcon: ({ focused, color }) =>
              tabSort({
                focused,
                color,
                icon: "wallet-outline",
                tab: "Wallet",
                isRotate: false,
              }),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused, color }) =>
              tabSort({
                focused,
                color,
                icon: "person-outline",
                tab: "Profile",
                isRotate: false,
              }),
          }}
        />
      </Tab.Navigator>
      {exitInfo()}
    </>
  );

  function tabSort({ focused, color, icon, tab, isRotate }) {
    return (
      <View style={{ alignItems: "center" }}>
        <View style={{ width: 26.0, height: 26.0 }}>
          <Ionicons
            name={icon}
            size={22}
            color={color}
            style={{
              marginBottom: Sizes.fixPadding - 7.0,
              transform: [{ rotate: isRotate ? "-45deg" : "0deg" }],
            }}
          />
        </View>
        <Text
          style={
            focused
              ? { ...Fonts.primaryColor14SemiBold }
              : { ...Fonts.grayColor14SemiBold }
          }
        >
          {tab}
        </Text>
        {focused ? <View style={styles.selectedTabIndicator}></View> : null}
      </View>
    );
  }

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={styles.exitInfoWrapStyle}>
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          Press Back Once Again To Exit!
        </Text>
      </View>
    ) : null;
  }
};

export default BottomTabBarScreen;

const styles = StyleSheet.create({
  exitInfoWrapStyle: {
    backgroundColor: Colors.blackColor,
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
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
