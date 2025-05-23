import { Text, View, Image, Platform, BackHandler } from "react-native";
import React, { useCallback } from "react";
import { Colors, Fonts, Sizes } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import { useFocusEffect } from "@react-navigation/native";

const RideCompleteScreen = ({ navigation }) => {
  const backAction = () => {
    if (Platform.OS === "ios") {
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      });
    } else {
      navigation.navigate("Journey");
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

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {successInfo()}
      </View>
      {backToHome()}
    </View>
  );

  function backToHome() {
    return (
      <Text
        onPress={() => {
          navigation.navigate("Journey");
        }}
        style={{
          ...Fonts.primaryColor16SemiBold,
          margin: Sizes.fixPadding * 2.0,
          alignSelf: "center",
        }}
      >
        Atgal į pradžią
      </Text>
    );
  }

  function successInfo() {
    return (
      <View style={{ alignItems: "center", margin: Sizes.fixPadding * 2.0 }}>
        <Image
          source={require("../../../assets/images/ride_end.png")}
          style={{ width: 250, height: 150.0, resizeMode: "contain" }}
        />
        <Text
          style={{
            ...Fonts.blackColor18SemiBold,
            marginTop: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding - 2.0,
          }}
        >
          Kelionė užbaigta
        </Text>
      </View>
    );
  }
};

export default RideCompleteScreen;
