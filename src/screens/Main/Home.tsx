import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebaseServices from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';

const { db, rtdb } = firebaseServices;

const calculateStarPercentage = (rating) => {
  const percentage = (rating / 5) * 100;
  return percentage;
};

const StarRating = ({ rating }) => {
  const starPercentage = (rating / 5) * 100;

  const fullStars = Math.floor(starPercentage / 20);
  const halfStar = (starPercentage % 20) >= 10 ? 1 : 0;

  return (
    <View style={styles.starRatingContainer}>
      {[1, 2, 3, 4, 5].map((index) => (
        <FontAwesome
          key={index}
          name={index <= fullStars ? 'star' : index === (fullStars + 1) && halfStar === 1 ? 'star-half-empty' : 'star-o'}
          size={20}
          color={index <= fullStars || (index === (fullStars + 1) && halfStar === 1) ? '#FFD700' : '#C0C0C0'}
        />
      ))}
    </View>
  );
};

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

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
          const database = getDatabase();
          const pointsRef = ref(database, 'users/' + currentUserId + '/totalPoints');
          onValue(pointsRef, (snapshot) => {
            const points = snapshot.val();
            if (points !== null) {
              setTotalPoints(points);
            }
          });
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
        <>
          <Text style={styles.greeting}>Labas, {username}</Text>
          <Text>Jūsų įvertinimas: </Text>
          <StarRating rating={totalPoints} />
        </>
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
  starRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
