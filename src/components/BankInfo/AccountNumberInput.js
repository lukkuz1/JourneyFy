// src/components/BankInfo/AccountNumberInput.js
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const AccountNumberInput = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sąskaitos numeris</Text>
      <View style={styles.valueBox}>
        <TextInput
          placeholder="Įveskite sąskaitos numerį"
          style={styles.textField}
          placeholderTextColor={Colors.grayColor}
          selectionColor={Colors.primaryColor}
          cursorColor={Colors.primaryColor}
          keyboardType="numeric"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Sizes.fixPadding * 2,
    marginBottom: Sizes.fixPadding * 2,
  },
  label: {
    ...Fonts.blackColor15SemiBold,
    marginBottom: Sizes.fixPadding,
  },
  valueBox: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5,
    ...CommonStyles.shadow,
    borderRadius: Sizes.fixPadding,
  },
  textField: {
    ...Fonts.blackColor15Medium,
    height: 20,
    padding: 0,
  },
});

export default AccountNumberInput;
