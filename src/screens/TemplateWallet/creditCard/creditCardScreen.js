// src/screens/CreditCardScreen.js
import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import { Colors, Sizes } from "../../../constants/styles";
import CreditCardForm from "../../../components/CreditCard/CreditCardForm";
import ContinueButton from "../../../components/CreditCard/ContinueButton";

const CreditCardScreen = ({ navigation }) => {
  const [cardData, setCardData] = useState({
    number: "invalid",
    expiry: "invalid",
    cvc: "invalid",
    name: "invalid",
  });

  const handleCardChange = (formData) => {
    setCardData({
      number: formData.values.number,
      expiry: formData.values.expiry,
      cvc: formData.values.cvc,
      name: formData.values.name,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title="Credit card" navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2 }}
        >
          <CreditCardForm onChange={handleCardChange} />
        </ScrollView>
      </View>
      <ContinueButton
        onPress={() =>
          navigation.navigate("SuccessfullyAddAndSendScreen", { successFor: "money" })
        }
      />
    </View>
  );
};

export default CreditCardScreen;