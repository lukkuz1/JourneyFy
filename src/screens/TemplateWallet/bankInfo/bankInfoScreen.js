import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React,{useState} from "react";
import { Colors, Fonts, Sizes, CommonStyles } from "../../../constants/styles";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";

const BankInfoScreen = ({ navigation }) => {
  const [bankName, setbankName] = useState("");
  const [branchCode, setbranchCode] = useState("");
  const [accountNo, setaccountNo] = useState("");
  
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={"Banko informacija"} navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          {accountHolderInfo()}
          {bankNameInfo()}
          {branchCodeInfo()}
          {accountNumberInfo()}
        </ScrollView>
      </View>
      {sendToButton()}
    </View>
  );

  function sendToButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("SuccessfullyAddAndSendScreen", { successFor: "bank" });
        }}
        style={{ ...CommonStyles.button, margin: Sizes.fixPadding * 2.0 }}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Send to bank (100.00)</Text>
      </TouchableOpacity>
    );
  }

  function accountNumberInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            ...Fonts.blackColor15SemiBold,
            marginBottom: Sizes.fixPadding,
          }}
        >
          Sąskaitos numeris
        </Text>
        <View style={styles.valueBox}>
          <TextInput
            placeholder="Enter account number"
            style={styles.textFieldStyle}
            placeholderTextColor={Colors.grayColor}
            selectionColor={Colors.primaryColor}
            cursorColor={Colors.primaryColor}
            keyboardType="numeric"
            value={accountNo}
            onChangeText={(value) => setaccountNo(value)}
          />
        </View>
      </View>
    );
  }

  function branchCodeInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            ...Fonts.blackColor15SemiBold,
            marginBottom: Sizes.fixPadding,
          }}
        >
          Filialo kodas
        </Text>
        <View style={styles.valueBox}>
          <TextInput
            placeholder="Įveskite filialo kodą"
            style={styles.textFieldStyle}
            placeholderTextColor={Colors.grayColor}
            selectionColor={Colors.primaryColor}
            cursorColor={Colors.primaryColor}
            value={branchCode}
            onChangeText={(value) => setbranchCode(value)}
          />
        </View>
      </View>
    );
  }

  function bankNameInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            ...Fonts.blackColor15SemiBold,
            marginBottom: Sizes.fixPadding,
          }}
        >
          Banko pavadinimas
        </Text>
        <View style={styles.valueBox}>
          <TextInput
            placeholder="Įveskite banko pavadinimą"
            style={styles.textFieldStyle}
            placeholderTextColor={Colors.grayColor}
            selectionColor={Colors.primaryColor}
            cursorColor={Colors.primaryColor}
            value={bankName}
            onChangeText={(value) => setbankName(value)}
          />
        </View>
      </View>
    );
  }

  function accountHolderInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            ...Fonts.blackColor15SemiBold,
            marginBottom: Sizes.fixPadding,
          }}
        >
          Sąskaitos savininko vardas
        </Text>
        <View style={styles.valueBox}>
          <TextInput
            placeholder="Įveskite sąskaitos savininko vardą"
            style={styles.textFieldStyle}
            placeholderTextColor={Colors.grayColor}
            selectionColor={Colors.primaryColor}
            cursorColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }
};

export default BankInfoScreen;

const styles = StyleSheet.create({
  valueBox: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
    ...CommonStyles.shadow,
    borderRadius: Sizes.fixPadding,
  },
  textFieldStyle: {
    ...Fonts.blackColor15Medium,
    height: 20.0,
    padding: 0,
  },
});
