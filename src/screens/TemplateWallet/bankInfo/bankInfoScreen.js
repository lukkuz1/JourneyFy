import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import { Colors } from "../../../constants/styles";
import AccountHolderInput from "../../../components/BankInfo/AccountHolderInput";
import BankNameInput from "../../../components/BankInfo/BankNameInput";
import BranchCodeInput from "../../../components/BankInfo/BranchCodeInput";
import AccountNumberInput from "../../../components/BankInfo/AccountNumberInput";
import SubmitButton from "../../../components/BankInfo/SubmitButton";

const BankInfoScreen = ({ navigation }) => {
  const [bankName, setBankName] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [accountNo, setAccountNo] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title="Banko informacija" navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          <AccountHolderInput />
          <BankNameInput value={bankName} onChangeText={setBankName} />
          <BranchCodeInput value={branchCode} onChangeText={setBranchCode} />
          <AccountNumberInput value={accountNo} onChangeText={setAccountNo} />
        </ScrollView>
      </View>
      <SubmitButton
        onPress={() =>
          navigation.navigate("SuccessfullyAddAndSendScreen", {
            successFor: "bank",
          })
        }
      />
    </View>
  );
};

export default BankInfoScreen;

const styles = StyleSheet.create({});
