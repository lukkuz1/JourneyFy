import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  BackHandler,
} from "react-native";
import React, { useCallback } from "react";
import { Colors, Sizes, Fonts } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import { useFocusEffect } from "@react-navigation/native";
import useUpdateWalletValueFromAmount from "../../../hooks/useUpdateWalletValueFromAmount";

const SuccessfullyAddAndSendScreen = ({ navigation, route }) => {
  const { successFor, amount } = route.params || {};

  const updatedWalletValue =
    successFor === "money"
      ? useUpdateWalletValueFromAmount(amount, "add")
      : useUpdateWalletValueFromAmount(amount, "subtract");

  const backAction = () => {
    if (Platform.OS === "ios") {
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      });
    } else {
      navigation.push("BottomTabBar");
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
      <View style={styles.center}>{congratsInfo()}</View>
      {backToHome()}
    </View>
  );

  function backToHome() {
    return (
      <Text
        onPress={() => {
          navigation.navigate("Wallet");
        }}
        style={{
          ...Fonts.primaryColor16SemiBold,
          margin: Sizes.fixPadding * 2.0,
          alignSelf: "center",
        }}
      >
        Grįžti į pradžią
      </Text>
    );
  }

  function congratsInfo() {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../../assets/images/icons/success.png")}
          style={{ width: 83.0, height: 83.0, resizeMode: "contain" }}
        />
        <Text
          style={{
            ...Fonts.primaryColor20SemiBold,
            marginTop: Sizes.fixPadding + 8.0,
          }}
        >
          {successFor === "money"
            ? `$${parseFloat(amount).toFixed(2)} pridėti`
            : `$${parseFloat(amount).toFixed(2)} išsiųsti`}
        </Text>
        <Text
          style={{
            ...Fonts.grayColor14SemiBold,
            textAlign: "center",
            marginTop: Sizes.fixPadding,
          }}
        >
          {successFor === "money"
            ? "Sveikiname, pinigai sėkmingai įvesti į piniginę"
            : "Sveikiname, pinigai sėkmingai nusiųsti"}
        </Text>
      </View>
    );
  }
};

export default SuccessfullyAddAndSendScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: Sizes.fixPadding * 4.0,
  },
});
