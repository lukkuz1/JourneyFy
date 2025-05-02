// src/components/CreditCard/CreditCardForm.js
import React from "react";
import { StyleSheet } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const CreditCardForm = ({ onChange }) => {
  return (
    <CreditCardInput
      requiresName
      requiresCVC
      labelStyle={{ ...Fonts.blackColor16SemiBold }}
      inputStyle={styles.cardInputFieldStyle}
      inputContainerStyle={{
        marginTop: Sizes.fixPadding * 2,
        marginHorizontal: Sizes.fixPadding * 2,
      }}
      validColor="black"
      invalidColor="red"
      placeholderColor={Colors.grayColor}
      onChange={onChange}
    />
  );
};

const styles = StyleSheet.create({
  cardInputFieldStyle: {
    ...Fonts.blackColor16Medium,
    backgroundColor: Colors.whiteColor,
    ...CommonStyles.shadow,
    borderColor: Colors.lightGrayColor,
    borderWidth: 1,
    paddingHorizontal: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5,
    height: 50,
    marginTop: Sizes.fixPadding - 2,
  },
});

export default CreditCardForm;
