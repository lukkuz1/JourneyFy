// src/screens/PaymentMethodsScreen.js
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import { Colors, Fonts, Sizes, CommonStyles } from "../../../constants/styles";
import PaymentMethodList from "../../../components/PaymentMethods/PaymentMethodList";

const paymentMethodsList = [
  {
    id: "1",
    paymentIcon: require("../../../assets/images/payment/credit_card.png"),
    paymentType: "Credit card",
  },
  {
    id: "2",
    paymentIcon: require("../../../assets/images/payment/paypal.png"),
    paymentType: "Paypal",
  },
  {
    id: "3",
    paymentIcon: require("../../../assets/images/payment/google_pay.png"),
    paymentType: "Google pay",
  },
  {
    id: "4",
    paymentIcon: require("../../../assets/images/payment/visa.png"),
    paymentType: "Visa card",
  },
];

const PaymentMethodsScreen = ({ navigation }) => {
  const [selectedMethodIndex, setSelectedMethodIndex] = useState(0);

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
          onPress={() => navigation.navigate("CreditCardScreen")}
          style={{ ...CommonStyles.button, marginVertical: Sizes.fixPadding * 2 }}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>Add amount ($50.00)</Text>
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