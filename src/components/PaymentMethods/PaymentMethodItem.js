// src/components/PaymentMethodItem.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const PaymentMethodItem = ({ item, index, isSelected, onSelect }) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onSelect}
        style={[styles.itemContainer, CommonStyles.rowAlignCenter, { marginHorizontal: Sizes.fixPadding * 2 }]}
      >
        <Image
          source={item.paymentIcon}
          style={styles.paymentIcon}
        />
        <Text
          numberOfLines={1}
          style={[Fonts.blackColor16Medium, { flex: 1, marginHorizontal: Sizes.fixPadding + 5 }]}
        >
          {item.paymentType}
        </Text>
        <View
          style={[
            styles.radioButton,
            {
              borderColor: isSelected ? Colors.secondaryColor : "#F9F8F8",
              borderWidth: isSelected ? 7 : 0,
            },
          ]}
        />
      </TouchableOpacity>
      {index === (item.length - 1) ? null : <View style={styles.divider} />}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: Sizes.fixPadding,
  },
  paymentIcon: {
    width: 30,
    height: 40,
    resizeMode: "contain",
  },
  radioButton: {
    backgroundColor: "#F9F8F8",
    width: 20,
    height: 20,
    borderRadius: 10,
    ...CommonStyles.shadow,
  },
  divider: {
    backgroundColor: Colors.lightGrayColor,
    height: 1,
    marginVertical: Sizes.fixPadding * 1.5,
    marginHorizontal: Sizes.fixPadding * 2,
  },
});

export default PaymentMethodItem;
