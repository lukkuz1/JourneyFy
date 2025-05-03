import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import { Colors } from "../../../constants/styles";
import WalletImage from "../../../components/AddAndSendMoney/WalletImage";
import AmountInfo from "../../../components/AddAndSendMoney/AmountInfo";
import ContinueButton from "../../../components/AddAndSendMoney/ContinueButton";
import useWalletValue from "../../../hooks/useWalletValue";

const AddAndSendMoneyScreen = ({ navigation, route }) => {
  const addFor = route?.params?.addFor || "money";
  const [amount, setAmount] = useState("");
  const walletValue = useWalletValue();

  const handleContinue = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      Alert.alert("Klaida", "Prašome įvesti teisingą sumą");
      return;
    }
    if (addFor !== "money" && amt > walletValue) {
      Alert.alert("Klaida", "Nepakanka lėšų piniginėje");
      return;
    }
    navigation.navigate("PaymentMethodsScreen", { addFor, amount });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header
          title={addFor === "money" ? "Pridėti pinigus" : "Siųsti pinigus"}
          navigation={navigation}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          <WalletImage />
          <AmountInfo addFor={addFor} amount={amount} setAmount={setAmount} />
          <ContinueButton onPress={handleContinue} />
        </ScrollView>
      </View>
    </View>
  );
};

export default AddAndSendMoneyScreen;
