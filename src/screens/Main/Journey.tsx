import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Button, Modal, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { collection, addDoc, getDocs, updateDoc, arrayUnion, doc, getDoc, where, query } from 'firebase/firestore'; // Import necessary Firestore methods
import firebaseServices from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';

const { db } = firebaseServices;

const Journey = () => {
  const [fromPlace, setFromPlace] = useState('');
  const [toPlace, setToPlace] = useState('');
  const [seatCount, setSeatCount] = useState('');
  const [pricePerPerson, setPricePerPerson] = useState('');
  const [journeys, setJourneys] = useState([]);
  const [registeredJourneys, setRegisteredJourneys] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); // State for add journey modal visibility
  const [isRegisteredModalVisible, setIsRegisteredModalVisible] = useState(false); // State for registered journeys modal visibility
  const auth = useAuth();
  const user = useUser();

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'journeys'));
        const journeyData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setJourneys(journeyData);
      } catch (error) {
        console.error('Error fetching journeys:', error);
      }
    };
  
    fetchJourneys();
  }, []);

  useEffect(() => {
    const fetchRegisteredJourneys = async () => {
      try {
        const q = query(collection(db, 'journeys'), where('registeredUsers', 'array-contains', { userId: firebaseServices.auth.currentUser.uid }));
        const querySnapshot = await getDocs(q);
        const registeredJourneyData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRegisteredJourneys(registeredJourneyData);
      } catch (error) {
        console.error('Error fetching registered journeys:', error);
      }
    };
  
    fetchRegisteredJourneys();
  }, [isRegisteredModalVisible]);

  const handleAddJourney = async () => {
    if (!fromPlace || !toPlace || !seatCount || !pricePerPerson) return;

    const newJourney = {
      from: fromPlace,
      to: toPlace,
      seatCount: parseInt(seatCount),
      pricePerPerson: parseFloat(pricePerPerson),
      registeredUsers: []
    };

    try {
      const docRef = await addDoc(collection(db, 'journeys'), newJourney);
      console.log('Journey added with ID: ', docRef.id);

      setFromPlace('');
      setToPlace('');
      setSeatCount('');
      setPricePerPerson('');

      // Update local state with the new journey
      setJourneys(prevJourneys => [
        ...prevJourneys,
        { id: docRef.id, ...newJourney }
      ]);

      // Close modal after adding journey
      setIsAddModalVisible(false);
    } catch (error) {
      console.error('Error adding journey:', error);
    }
  };

  const handleRegisterJourney = async (journeyId) => {
    try {
      // Retrieve the specific journey document reference
      const journeyRef = doc(db, 'journeys', journeyId);
  
      // Get the current journey data
      const journeyDoc = await getDoc(journeyRef);
      if (!journeyDoc.exists()) {
        console.error('Journey not found.');
        return;
      }
  
      // Extract the current seat count
      const currentSeatCount = journeyDoc.data().seatCount;
  
      // Check if there are available seats
      if (currentSeatCount > 0) {
        // Update the seatCount and registeredUsers fields
        await updateDoc(journeyRef, {
          seatCount: currentSeatCount - 1,
          registeredUsers: arrayUnion({
            userId: firebaseServices.auth.currentUser.uid,
            userEmail: user.user.email
          })
        });
  
        // Optionally update the local journeys list to reflect the change
        const updatedJourneys = journeys.map(journey => {
          if (journey.id === journeyId) {
            return {
              ...journey,
              seatCount: currentSeatCount - 1
            };
          }
          return journey;
        });
        setJourneys(updatedJourneys);
      } else {
        console.error('No available seats.');
      }
    } catch (error) {
      console.error('Error registering for journey:', error);
    }
  };

  const renderJourneyItem = ({ item }) => (
    <TouchableOpacity style={styles.journeyItem} onPress={() => handleRegisterJourney(item.id)}>
      <Text>{`Iš ${item.from} į ${item.to}, liko vietų: ${item.seatCount}, kaina: ${item.pricePerPerson} €`}</Text>
    </TouchableOpacity>
  );

  const renderRegisteredJourneyItem = ({ item }) => (
    <TouchableOpacity style={styles.journeyItem}>
      <Text>{`Iš ${item.from} į ${item.to}, liko vietų: ${item.seatCount}, kaina: ${item.pricePerPerson} €`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text>Kelionių langas</Text>
      <Button title="Pridėti kelionę" onPress={() => setIsAddModalVisible(true)} />
      <Button title="Mano kelionės" onPress={() => setIsRegisteredModalVisible(true)} />

      <FlatList
        data={journeys}
        renderItem={renderJourneyItem}
        keyExtractor={item => item.id}
      />

      {/* Modal for adding a journey */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Pridėti kelionę</Text>
              <TextInput
                style={styles.input}
                placeholder="Iš kur"
                value={fromPlace}
                onChangeText={setFromPlace}
              />
              <TextInput
                style={styles.input}
                placeholder="Į kur"
                value={toPlace}
                onChangeText={setToPlace}
              />
              <TextInput
                style={styles.input}
                placeholder="Vietų skaičius"
                keyboardType="numeric"
                value={seatCount}
                onChangeText={setSeatCount}
              />
              <TextInput
                style={styles.input}
                placeholder="Kaina už žmogų"
                keyboardType="numeric"
                value={pricePerPerson}
                onChangeText={setPricePerPerson}
              />
              <Button title="Pridėti kelionę" onPress={handleAddJourney} />
              <Button title="Uždaryti" onPress={() => setIsAddModalVisible(false)} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal for displaying registered journeys */}
      <Modal
        visible={isRegisteredModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsRegisteredModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Mano kelionės</Text>
              <FlatList
                data={registeredJourneys}
                renderItem={renderRegisteredJourneyItem}
                keyExtractor={item => item.id}
              />
              <Button title="Uždaryti" onPress={() => setIsRegisteredModalVisible(false)} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  journeyItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Journey;
