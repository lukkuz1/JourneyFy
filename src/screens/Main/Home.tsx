import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import firebaseServices from '../../services/firebase';

const { db } = firebaseServices;

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const currentUserId = auth.currentUser ? auth.currentUser.uid : null;
  console.log(currentUserId);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUserId) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUserId));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username);
          } else {
            console.error('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user: ', error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [currentUserId]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.greeting}>Labas, {username}</Text>
      )}
      <Pressable onPress={toggleModal}>
        <Text style={styles.modalTrigger}>Kas yra Journeyfy?</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Journeyfy yra programėlė, kuri leidžia jums kurti kelionės pasiūlymus kitiems arba tiesiog prisijungti prie norimos kelionės.
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={toggleModal}
            >
              <Text style={styles.textStyle}>Uždaryti</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    marginBottom: 20,
  },
  modalTrigger: {
    fontSize: 16,
    color: 'blue',
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
