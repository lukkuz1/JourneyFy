// src/components/CreditCard/PaypalForm.js
import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const PaypalForm = ({ onChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
    onChange({ email: text, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>PayPal el. paštas</Text>
      <TextInput
        style={styles.input}
        placeholder="Įveskite savo Paypal el. paštą"
        onChangeText={handleEmailChange}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Sizes.fixPadding * 2,
    marginVertical: Sizes.fixPadding * 2,
  },
  label: {
    ...Fonts.blackColor16SemiBold,
    marginBottom: Sizes.fixPadding / 2,
  },
  input: {
    ...Fonts.blackColor16Medium,
    backgroundColor: Colors.whiteColor,
    ...CommonStyles.shadow,
    borderWidth: 1,
    borderColor: Colors.lightGrayColor,
    paddingHorizontal: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5,
    height: 50,
  },
});

export default PaypalForm;
