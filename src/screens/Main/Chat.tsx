import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { collection, getDocs, doc, updateDoc, arrayUnion, addDoc, onSnapshot } from 'firebase/firestore'; // Import necessary Firestore methods
import firebaseServices from '../../services/firebase';

const { db } = firebaseServices;

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  const chatListenerRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersData);
        setFilteredUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [db]);

  useEffect(() => {
    if (!selectedUser) return;

    // Set up a listener for real-time updates to selectedUser's chatHistory
    chatListenerRef.current = onSnapshot(doc(db, 'users', selectedUser.id), (snapshot) => {
      const userData = snapshot.data();
      if (userData && userData.chatHistory) {
        setChatHistory(userData.chatHistory);
      }
    });

    return () => {
      // Clean up the listener
      if (chatListenerRef.current) {
        chatListenerRef.current();
        chatListenerRef.current = null;
      }
    };
  }, [selectedUser]);

  const handleSendMessage = async () => {
    if (!selectedUser || inputMessage.trim() === '') return;

    const newMessage = {
      text: inputMessage,
      fromMe: true,
      timestamp: new Date().getTime() // Use getTime() to get timestamp as a number
    };

    try {
      const senderRef = doc(db, 'users', selectedUser.id);
      await updateDoc(senderRef, {
        chatHistory: arrayUnion(newMessage)
      });

      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.userItem, selectedUser && selectedUser.id === item.id ? styles.selectedUser : null]}
      onPress={() => setSelectedUser(item)}
    >
      <Text style={styles.userName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.fromMe ? styles.myMessage : styles.theirMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        style={styles.userList}
      />
      {selectedUser && (
        <>
          <FlatList
            data={chatHistory}
            renderItem={renderMessage}
            keyExtractor={(item, index) => index.toString()}
            inverted
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.inputContainer}
          >
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              value={inputMessage}
              onChangeText={text => setInputMessage(text)}
              onSubmitEditing={handleSendMessage}
              returnKeyType="send"
            />
          </KeyboardAvoidingView>
        </>
      )}
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
  userList: {
    flex: 1,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  selectedUser: {
    backgroundColor: '#e0e0e0',
  },
  userName: {
    fontSize: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0e64d2',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
    color: '#fff', // Text color for my messages
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
});

export default Chat;
