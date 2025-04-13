// src/screens/WalletScreen.js
import React from "react";
import { View, ScrollView } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import WalletHeader from "../../../components/Wallet/WalletHeader";
import WalletImage from "../../../components/Wallet/WalletImage";
import BalanceInfo from "../../../components/Wallet/BalanceInfo";
import { Colors } from "../../constants/styles";

const WalletScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <WalletHeader title="Piniginė" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }} // or use your Sizes.fixPadding value
        >
          <WalletImage />
          <BalanceInfo navigation={navigation} />
        </ScrollView>
      </View>
    </View>
  );
};

export default WalletScreen;