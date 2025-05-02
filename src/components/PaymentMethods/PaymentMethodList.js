// src/components/PaymentMethods/PaymentMethodList.js
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Sizes } from "../../constants/styles";
import PaymentMethodItem from "./PaymentMethodItem";

const PaymentMethodList = ({ methods, selectedMethodIndex, onSelectMethod, navigation }) => {
  const renderItem = ({ item, index }) => (
    <PaymentMethodItem
      item={item}
      index={index}
      isSelected={selectedMethodIndex === index}
      onSelect={() => onSelectMethod(index)}
      navigation={navigation}
    />
  );
  
  return (
    <FlatList
      data={methods}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2 }}
    />
  );
};

export default PaymentMethodList;
