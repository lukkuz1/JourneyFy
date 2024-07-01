import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { collection, getDocs, doc, updateDoc, arrayUnion, addDoc, onSnapshot } from 'firebase/firestore';
import firebaseServices from '../../services/firebase';

const { db } = firebaseServices;

const Chat = () => {


  return (
    <View style={styles.container}>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
});

export default Chat;

