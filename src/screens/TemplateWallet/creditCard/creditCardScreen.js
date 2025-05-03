import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import { Colors, Sizes } from "../../../constants/styles";
import PaypalForm from "../../../components/CreditCard/PaypalForm";
import ContinueButton from "../../../components/CreditCard/ContinueButton";

const CreditCardScreen = ({ navigation, route }) => {
  const { addFor = "money", amount } = route.params || {};
  const [paypalData, setPaypalData] = useState({
    email: "",
    password: "",
  });

  const handlePaypalChange = (formData) => {
    setPaypalData({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title="PayPal" navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2 }}
        >
          <PaypalForm onChange={handlePaypalChange} />
        </ScrollView>
      </View>
      <ContinueButton
        onPress={() =>
          navigation.navigate("SuccessfullyAddAndSendScreen", {
            successFor: addFor,
            paypalData,
            amount,
          })
        }
      />
    </View>
  );
};

export default CreditCardScreen;
