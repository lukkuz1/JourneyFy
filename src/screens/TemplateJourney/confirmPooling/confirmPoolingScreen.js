import { Text, View, Image, Platform, BackHandler } from "react-native";
import React, { useCallback } from "react";
import { Colors, Fonts, Sizes } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import { useFocusEffect } from "@react-navigation/native";

const ConfirmPoolingScreen = ({ navigation }) => {
  const backAction = () => {
    if (Platform.OS === "ios") {
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      });
    } else {
      navigation.navigate("HomeScreen");
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
        {congratsInfo()}
      </View>
      {backToHome()}
    </View>
  );

  function backToHome() {
    return (
      <Text
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
        style={{
          ...Fonts.primaryColor16SemiBold,
          margin: Sizes.fixPadding * 2.0,
          alignSelf: "center",
        }}
      >
        Atgal į Pradžią
      </Text>
    );
  }

  function congratsInfo() {
    return (
      <View style={{ alignItems: "center", margin: Sizes.fixPadding * 2.0 }}>
        <Image
          source={require("../../../assets/images/confirm_pooling.png")}
          style={{ width: 250, height: 150.0, resizeMode: "contain" }}
        />
        <Text
          style={{
            ...Fonts.blackColor18SemiBold,
            marginTop: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding - 2.0,
          }}
        >
          Sveikiname
        </Text>
        <Text style={{ ...Fonts.grayColor14SemiBold, textAlign: "center" }}>
          Jūsų kelionės pasiūlymas yra{`\n`}patvirtintas
        </Text>
      </View>
    );
  }
};

export default ConfirmPoolingScreen;
