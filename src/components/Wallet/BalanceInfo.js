import React, { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import WalletOption from "./WalletOption";
import useWalletValue from "../../hooks/useWalletValue";

const BalanceInfo = ({ navigation }) => {
  const walletValue = useWalletValue();
  useFocusEffect(
    useCallback(() => {
      return () => {};
    }, [])
  );

  return (
    <View style={styles.balanceInfoWrapper}>
      <View style={styles.balanceView}>
        <Text style={{ ...Fonts.primaryColor30Medium }}>€{walletValue}</Text>
        <Text style={{ ...Fonts.grayColor18Medium }}>Galimas likutis</Text>
      </View>

      <WalletOption
        iconName="wallet-plus-outline"
        iconType="MaterialCommunityIcons"
        iconColor={Colors.secondaryColor}
        optionTitle="Pridėti pinigus"
        optionSubtitle="Galite lengvai pridėti pinigų"
        onPress={() =>
          navigation.navigate("AddAndSendMoneyScreen", { addFor: "money" })
        }
      />

      <WalletOption
        iconName="credit-card-plus-outline"
        iconType="MaterialCommunityIcons"
        iconColor={Colors.secondaryColor}
        optionTitle="Siųsti pinigus"
        optionSubtitle="Lengvai siųskite pinigus atgal"
        onPress={() =>
          navigation.navigate("AddAndSendMoneyScreen", { addFor: "bank" })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  balanceInfoWrapper: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    ...CommonStyles.shadow,
    marginHorizontal: Sizes.fixPadding * 2,
    marginBottom: Sizes.fixPadding * 2,
    padding: Sizes.fixPadding + 5,
  },
  balanceView: {
    alignItems: "center",
    margin: Sizes.fixPadding * 4,
  },
});

export default BalanceInfo;
