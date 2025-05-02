// src/components/Transactions/TransactionItem.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const TransactionItem = ({ item, isLast }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.detailsRow}>
          <View style={styles.detailTextContainer}>
            <Text numberOfLines={1} style={{ ...Fonts.blackColor15SemiBold }}>
              {item.title}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.grayColor13SemiBold,
                marginTop: Sizes.fixPadding - 7,
              }}
            >
              Jenny wilsom | {item.date}
            </Text>
          </View>
          <Text
            style={
              item.isIncome
                ? { ...Fonts.greenColor16SemiBold }
                : { ...Fonts.redColor16SemiBold }
            }
          >
            {item.amount}
          </Text>
        </View>
      </View>
      {!isLast && <View style={styles.divider} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Sizes.fixPadding * 2,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailTextContainer: {
    flex: 1,
  },
  divider: {
    backgroundColor: Colors.grayColor,
    height: 1,
    marginVertical: Sizes.fixPadding * 2,
    marginHorizontal: Sizes.fixPadding * 2,
  },
});

export default TransactionItem;
