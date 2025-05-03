import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Sizes } from "../../constants/styles";
import TransactionItem from "./TransactionItem";

const TransactionList = ({ transactions }) => {
  const renderItem = ({ item, index }) => {
    const isLast = index === transactions.length - 1;
    return <TransactionItem item={item} isLast={isLast} />;
  };

  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2 }}
    />
  );
};

export default TransactionList;
