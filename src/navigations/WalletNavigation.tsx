import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AddAndSendMoneyScreen from "../screens/TemplateWallet/addAndSendMoney/addAndSendMoneyScreen";
import BankInfoScreen from "../screens/TemplateWallet/bankInfo/bankInfoScreen";
import CreditCardScreen from "../screens/TemplateWallet/creditCard/creditCardScreen";
import PaymentMethodsScreen from "../screens/TemplateWallet/paymentMethods/paymentMethodsScreen";
import SuccessfullyAddAndSendScreen from "../screens/TemplateWallet/successfullyAddAndSend/successfullyAddAndSendScreen";
import TransactionsScreen from "../screens/TemplateWallet/transactions/transactionsScreen";
import Wallet from "../screens/Main/Wallet";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default function WalletNavigation() {
    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
            presentation: "modal",
          }}
          initialRouteName="Wallet"
        >
          <Stack.Screen name="Wallet" component={Wallet} />
          <Stack.Screen name="AddAndSendMoneyScreen" component={AddAndSendMoneyScreen} />
          <Stack.Screen name="BankInfoScreen" component={BankInfoScreen} />
          <Stack.Screen name="CreditCardScreen" component={CreditCardScreen} />
          <Stack.Screen name="PaymentMethodsScreen" component={PaymentMethodsScreen} />
          <Stack.Screen name="SuccessfullyAddAndSendScreen" component={SuccessfullyAddAndSendScreen} />
          <Stack.Screen name="TransactionsScreen" component={TransactionsScreen} />

        </Stack.Navigator>
      );
}
