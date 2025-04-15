// src/screens/PaymentMethodsScreen.js
import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import { Colors, Fonts, Sizes, CommonStyles } from "../../../constants/styles";
import PaymentMethodList from "../../../components/PaymentMethods/PaymentMethodList";

const paymentMethodsList = [
  {
    id: "1",
    paymentIcon: require("../../../assets/images/payment/paypal.png"),
    paymentType: "Paypal",
  }
];

const PaymentMethodsScreen = ({ navigation, route }) => {
  const [selectedMethodIndex, setSelectedMethodIndex] = useState(0);
  
  // Retrieve addFor and amount from route parameters.
  // If amount is not provided, default to "0".
  const { addFor = "money", amount = "0" } = route?.params || {};
  
  const buttonText =
    addFor === "money"
      ? `Pridėti ($${amount})`
      : `Siųsti ($${amount})`;

  // Log the route params for debugging purposes.
  useEffect(() => {
    console.log("PaymentMethodsScreen params:", route?.params);
  }, [route]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={"Mokėjimo metodas"} navigation={navigation} />
        <PaymentMethodList
          methods={paymentMethodsList}
          selectedMethodIndex={selectedMethodIndex}
          onSelectMethod={setSelectedMethodIndex}
          navigation={navigation}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => 
            navigation.navigate("CreditCardScreen", { addFor, amount })
          }
          style={{ ...CommonStyles.button, marginVertical: Sizes.fixPadding * 2 }}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentMethodsScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.whiteColor,
  },
});