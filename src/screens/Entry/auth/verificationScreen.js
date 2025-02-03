import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import {
  Colors,
  Fonts,
  Sizes,
  CommonStyles,
  screenHeight,
} from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import OTPTextView from "react-native-otp-textinput";
import { Overlay } from "@rneui/themed";
import { ActivityIndicator } from "react-native-paper";

const VerificationScreen = ({ navigation }) => {
  const [otpInput, setotpInput] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [time, setTime] = useState(22);

  const timeOutCallback = useCallback(
    () => setTime((currTimer) => (currTimer == 0 ? null : currTimer - 1)),
    []
  );

  useEffect(() => {
    time > 0 && setTimeout(timeOutCallback, 1000);
    () => {
      return clearTimeout(timeOutCallback);
    };
  }, [time, timeOutCallback]);

  const resetTimer = function () {
    if (!time) {
      setTime(22);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{}}
        >
          {imageView()}
          {verificationInfo()}
        </ScrollView>
        {loadingDialog()}
      </View>
    </View>
  );

  function header() {
    return (
      <View
        style={{
          backgroundColor: Colors.primaryColor,
          padding: Sizes.fixPadding * 2.0,
        }}
      >
        <MaterialIcons
          name="arrow-back-ios"
          color={Colors.whiteColor}
          size={22}
          onPress={() => {
            navigation.pop();
          }}
        />
      </View>
    );
  }

  function verificationInfo() {
    return (
      <View style={{ flex: 1 }}>
        {verificationDescription()}
        {otpFields()}
        {timeInfo()}
        {verifyButton()}
        {resendInfo()}
      </View>
    );
  }

  function timeInfo() {
    return (
      <Text
        style={{
          ...Fonts.secondaryColor16SemiBold,
          textAlign: "center",
          margin: Sizes.fixPadding * 3.0,
        }}
      >
        00:{time.toString().length == 1 ? `0${time}` : time}
      </Text>
    );
  }

  function resendInfo() {
    return (
      <Text
        style={{
          ...Fonts.blackColor16SemiBold,
          margin: Sizes.fixPadding * 2.0,
          textAlign: "center",
        }}
      >
        Didn’t receive code? {}
        <Text
          onPress={() => {
            time == 0 ? resetTimer() : null;
          }}
          style={{ ...Fonts.primaryColor16SemiBold }}
        >
          Resend
        </Text>
      </Text>
    );
  }

  function loadingDialog() {
    return (
      <Overlay isVisible={isLoading} overlayStyle={styles.dialogStyle}>
        <View style={{ margin: Sizes.fixPadding * 3.0 }}>
          <ActivityIndicator size={40} color={Colors.primaryColor} />
          <Text
            style={{
              marginTop: Sizes.fixPadding,
              ...Fonts.primaryColor18SemiBold,
            }}
          >
            Please wait
          </Text>
        </View>
      </Overlay>
    );
  }

  function otpFields() {
    return (
      <OTPTextView
        containerStyle={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          justifyContent: "center",
        }}
        handleTextChange={(text) => {
          setotpInput(text);
          if (text.length == 5) {
            setisLoading(true);
            setTimeout(() => {
              setisLoading(false);
              navigation.push("BottomTabBar");
            }, 2000);
          }
        }}
        inputCount={5}
        keyboardType="numeric"
        tintColor={Colors.primaryColor}
        offTintColor={Colors.lightGrayColor}
        textInputStyle={{ ...styles.textFieldStyle }}
      />
    );
  }

  function verifyButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setisLoading(true);
          setTimeout(() => {
            setisLoading(false);
            navigation.push("BottomTabBar");
          }, 2000);
        }}
        style={{ ...CommonStyles.button }}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Verify</Text>
      </TouchableOpacity>
    );
  }

  function verificationDescription() {
    return (
      <View style={{ alignItems: "center", margin: Sizes.fixPadding * 3.0 }}>
        <Text style={{ ...Fonts.blackColor20SemiBold }}>OTP verification</Text>
        <Text
          style={{
            ...Fonts.grayColor15Medium,
            textAlign: "center",
            marginTop: Sizes.fixPadding,
          }}
        >
          Confirmation code has been sent to you your mobile number +91
          1234567890
        </Text>
      </View>
    );
  }

  function imageView() {
    return (
      <View style={styles.imageViewWrapStyle}>
        <Image
          source={require("../../assets/images/auth.png")}
          style={{ width: "100%", height: "65%", resizeMode: "contain" }}
        />
      </View>
    );
  }
};

export default VerificationScreen;

const styles = StyleSheet.create({
  imageViewWrapStyle: {
    height: screenHeight / 2.7,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -40.0,
  },
  textFieldStyle: {
    borderBottomWidth: null,
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.primaryColor,
    borderWidth: 1.5,
    ...Fonts.primaryColor20SemiBold,
    ...CommonStyles.shadow,
    marginHorizontal: Sizes.fixPadding - 3.0,
  },
  dialogStyle: {
    width: "85%",
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
