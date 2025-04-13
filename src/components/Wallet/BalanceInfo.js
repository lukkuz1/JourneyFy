// src/components/BalanceInfo.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import WalletOption from "./WalletOption";

const BalanceInfo = ({ navigation }) => {
  return (
    <View style={styles.balanceInfoWrapper}>
      <View style={styles.balanceView}>
        <Text style={{ ...Fonts.primaryColor30Medium }}>$150</Text>
        <Text style={{ ...Fonts.grayColor18Medium }}>Galimas likutis</Text>
      </View>

      <WalletOption
        iconName="swap-vertical"
        iconType="MaterialCommunityIcons"
        iconColor={Colors.secondaryColor}
        optionTitle="Sandoris"
        optionSubtitle="Peržiūrėti visų sandorių sąrašą"
        onPress={() => navigation.navigate("TransactionsScreen")}
      />

      <WalletOption
        iconName="wallet-plus-outline"
        iconType="MaterialCommunityIcons"
        iconColor={Colors.secondaryColor}
        optionTitle="Pridėti pinigus"
        optionSubtitle="Galite lengvai pridėti pinigų"
        containerStyle={{ marginVertical: Sizes.fixPadding * 2 }}
        onPress={() =>
          navigation.navigate("AddAndSendMoneyScreen", { addFor: "money" })
        }
      />

      <WalletOption
        iconName="credit-card-plus-outline"
        iconType="MaterialCommunityIcons"
        iconColor={Colors.secondaryColor}
        optionTitle="Siųsti į banką"
        optionSubtitle="Lengvai siųskite pinigus į banką"
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
