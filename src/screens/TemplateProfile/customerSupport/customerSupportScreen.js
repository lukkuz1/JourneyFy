import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import { Colors } from "../../../constants/styles";
import ContactInfo from "../../../components/CustomerSupport/ContactInfo";
import CallAndMailButtons from "../../../components/CustomerSupport/CallAndMailButtons";
import SupportForm from "../../../components/CustomerSupport/SupportForm";
import SubmitButton from "../../../components/CustomerSupport/SubmitButton";

const CustomerSupportScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title="Klientų aptarnavimas" navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          <ContactInfo />
          <CallAndMailButtons />
          <SupportForm />
        </ScrollView>
      </View>
      <SubmitButton onPress={() => navigation.pop()} />
    </View>
  );
};

export default CustomerSupportScreen;
