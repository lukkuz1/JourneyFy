// src/screens/AddAndSendMoneyScreen.js
import React from "react";
import { View, ScrollView } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import { Colors } from "../../../constants/styles";
import WalletImage from "../../../components/AddAndSendMoney/WalletImage";
import AmountInfo from "../../../components/AddAndSendMoney/AmountInfo";
import ContinueButton from "../../../components/AddAndSendMoney/ContinueButton";

const AddAndSendMoneyScreen = ({ navigation, route }) => {
  const addFor = route?.params?.addFor;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header
          title={addFor === "money" ? "Pridėti pinigus" : "Siųsti į banką"}
          navigation={navigation}
        />
        <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
          <WalletImage />
          <AmountInfo addFor={addFor} />
          <ContinueButton navigation={navigation} addFor={addFor} />
        </ScrollView>
      </View>
    </View>
  );
};

export default AddAndSendMoneyScreen;