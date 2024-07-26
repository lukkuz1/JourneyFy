import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard, Platform, ScrollView } from 'react-native';
import { collection, addDoc, getDocs, updateDoc, arrayUnion, doc, getDoc, where, query } from 'firebase/firestore';
import firebaseServices from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import { TextInput, Button, Card, Title, Paragraph, FAB, Provider as PaperProvider } from 'react-native-paper';

const { db } = firebaseServices;

const Journey = () => {
  const [fromPlace, setFromPlace] = useState('');
  const [toPlace, setToPlace] = useState('');
  const [seatCount, setSeatCount] = useState('');
  const [pricePerPerson, setPricePerPerson] = useState('');
  const [journeys, setJourneys] = useState([]);
  const [filteredJourneys, setFilteredJourneys] = useState([]);
  const [registeredJourneys, setRegisteredJourneys] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isRegisteredModalVisible, setIsRegisteredModalVisible] = useState(false);
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [filterSeatCount, setFilterSeatCount] = useState('');
  const [filterPricePerPerson, setFilterPricePerPerson] = useState('');
  const auth = useAuth();
  const user = useUser();

  const fetchJourneys = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'journeys'));
      const journeyData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJourneys(journeyData);
      setFilteredJourneys(journeyData);
    } catch (error) {
      console.error('Error fetching journeys:', error);
    }
  };

  useEffect(() => {

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
      setFromPlace('');
      setToPlace('');
      setSeatCount('');
      setPricePerPerson('');
      setJourneys(prevJourneys => [...prevJourneys, { id: docRef.id, ...newJourney }]);
      setIsAddModalVisible(false);
      fetchJourneys();
    } catch (error) {
      console.error('Error adding journey:', error);
    }
  };

  const handleRegisterJourney = async (journeyId) => {
    try {
      const journeyRef = doc(db, 'journeys', journeyId);
      const journeyDoc = await getDoc(journeyRef);
      if (!journeyDoc.exists()) {
        console.error('Journey not found.');
        return;
      }
      const currentSeatCount = journeyDoc.data().seatCount;
      if (currentSeatCount > 0) {
        await updateDoc(journeyRef, {
          seatCount: currentSeatCount - 1,
          registeredUsers: arrayUnion({
            userId: firebaseServices.auth.currentUser.uid,
            userEmail: user.user.email
          })
        });
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

  const filterJourneys = () => {
    let filtered = journeys;
    if (filterFrom) {
      filtered = filtered.filter(journey => journey.from.toLowerCase().includes(filterFrom.toLowerCase()));
    }
    if (filterTo) {
      filtered = filtered.filter(journey => journey.to.toLowerCase().includes(filterTo.toLowerCase()));
    }
    if (filterSeatCount) {
      filtered = filtered.filter(journey => journey.seatCount >= parseInt(filterSeatCount));
    }
    if (filterPricePerPerson) {
      filtered = filtered.filter(journey => journey.pricePerPerson <= parseFloat(filterPricePerPerson));
    }
    setFilteredJourneys(filtered);
  };

  const renderJourneyItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{`Iš ${item.from} į ${item.to}`}</Title>
        <Paragraph>{`Liko vietų: ${item.seatCount}, Kaina: ${item.pricePerPerson} €`}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => handleRegisterJourney(item.id)} color="#0e64d2">Registruotis</Button>
      </Card.Actions>
    </Card>
  );

  const renderRegisteredJourneyItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{`Iš ${item.from} į ${item.to}`}</Title>
        <Paragraph>{`Liko vietų: ${item.seatCount}, Kaina: ${item.pricePerPerson} €`}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <PaperProvider>
      <View style={styles.container}>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => setIsAddModalVisible(true)}
          color="white"
          theme={{ colors: { accent: '#0e64d2' } }}
        />
        <Button mode="contained" style={styles.button} onPress={() => setIsRegisteredModalVisible(true)} color="#0e64d2">Mano kelionės</Button>

        <TextInput
          style={styles.input}
          label="Filtruoti pagal išvykimo vietą"
          value={filterFrom}
          onChangeText={setFilterFrom}
          theme={{ colors: { primary: '#0e64d2' } }}
        />
        <TextInput
          style={styles.input}
          label="Filtruoti pagal atvykimo vietą"
          value={filterTo}
          onChangeText={setFilterTo}
          theme={{ colors: { primary: '#0e64d2' } }}
        />
        <TextInput
          style={styles.input}
          label="Filtruoti pagal vietų skaičių (min)"
          keyboardType="numeric"
          value={filterSeatCount}
          onChangeText={setFilterSeatCount}
          theme={{ colors: { primary: '#0e64d2' } }}
        />
        <TextInput
          style={styles.input}
          label="Filtruoti pagal kainą (max)"
          keyboardType="numeric"
          value={filterPricePerPerson}
          onChangeText={setFilterPricePerPerson}
          theme={{ colors: { primary: '#0e64d2' } }}
        />
        <Button mode="contained" style={styles.button} onPress={filterJourneys} color="#0e64d2">Filtruoti</Button>

        <FlatList
          data={filteredJourneys}
          renderItem={renderJourneyItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />

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
                  label="Iš kur"
                  value={fromPlace}
                  onChangeText={setFromPlace}
                  theme={{ colors: { primary: '#0e64d2' } }}
                />
                <TextInput
                  style={styles.input}
                  label="Į kur"
                  value={toPlace}
                  onChangeText={setToPlace}
                  theme={{ colors: { primary: '#0e64d2' } }}
                />
                <TextInput
                  style={styles.input}
                  label="Vietų skaičius"
                  keyboardType="numeric"
                  value={seatCount}
                  onChangeText={setSeatCount}
                  theme={{ colors: { primary: '#0e64d2' } }}
                />
                <TextInput
                  style={styles.input}
                  label="Kaina už žmogų"
                  keyboardType="numeric"
                  value={pricePerPerson}
                  onChangeText={setPricePerPerson}
                  theme={{ colors: { primary: '#0e64d2' } }}
                />
                <Button mode="contained" style={styles.button} onPress={handleAddJourney} color="#0e64d2">Pridėti kelionę</Button>
                <Button mode="text" onPress={() => setIsAddModalVisible(false)} color="#0e64d2">Uždaryti</Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

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
                  contentContainerStyle={styles.list}
                />
                <Button mode="text" onPress={() => setIsRegisteredModalVisible(false)} color="#0e64d2">Uždaryti</Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
    width: '100%',
    color: '#0e64d2',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0e64d2'
  },
  card: {
    width: '100%',
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#0e64d2',
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
    width: '90%',
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
    color: '#0e64d2',
  },
  list: {
    paddingBottom: 100,
  },
});

export default Journey;
