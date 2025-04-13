// src/screens/TransactionsScreen.js
import React from "react";
import { View } from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import Header from "../../../components/header";
import { Colors } from "../../../constants/styles";
import TransactionList from "../../../components/Transactions/TransactionList";

const transactionsList = [
  {
    id: "1",
    title: "Paid to rider",
    date: "25 jan 2023",
    amount: "$24.00",
    isIncome: false,
  },
  {
    id: "2",
    title: "Add to wallet",
    date: "25 jan 2023",
    amount: "$30.00",
    isIncome: true,
  },
  {
    id: "3",
    title: "Receive from ride taker",
    date: "25 jan 2023",
    amount: "$10.00",
    isIncome: true,
  },
  {
    id: "4",
    title: "Paid to rider",
    date: "25 jan 2023",
    amount: "$15.00",
    isIncome: false,
  },
  {
    id: "5",
    title: "Add to wallet",
    date: "25 jan 2023",
    amount: "$30.00",
    isIncome: true,
  },
  {
    id: "6",
    title: "Paid to rider",
    date: "25 jan 2023",
    amount: "$10.00",
    isIncome: false,
  },
  {
    id: "7",
    title: "Receive from ride taker",
    date: "25 jan 2023",
    amount: "$150.00",
    isIncome: true,
  },
  {
    id: "8",
    title: "Receive from ride taker",
    date: "25 jan 2023",
    amount: "$20.00",
    isIncome: true,
  },
  {
    id: "9",
    title: "Paid to rider",
    date: "25 jan 2023",
    amount: "$25.00",
    isIncome: false,
  },
  {
    id: "10",
    title: "Receive from ride taker",
    date: "25 jan 2023",
    amount: "$24.00",
    isIncome: true,
  },
  {
    id: "11",
    title: "Paid to rider",
    date: "25 jan 2023",
    amount: "$24.00",
    isIncome: false,
  },
  {
    id: "12",
    title: "Receive from ride taker",
    date: "25 jan 2023",
    amount: "$24.00",
    isIncome: true,
  },
];

const TransactionsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={"Sandoris"} navigation={navigation} />
        <TransactionList transactions={transactionsList} />
      </View>
    </View>
  );
};

export default TransactionsScreen;