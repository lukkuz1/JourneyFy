import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseServices from "../../services/firebase";
import Colors from "../../constants/Colors";
import EntryInputField from "../../components/Entry/EntryInputField";
import EntryButton from "../../components/Entry/EntryButton";

const { db } = firebaseServices;

export default function MainInfo() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleInfo = async () => {
    if (!username || !name || !surname || !dateOfBirth) {
      setError("Užpildykite visus laukus");
      return;
    }

    try {
      await setDoc(doc(db, "users", user.uid), {
        username,
        name,
        surname,
        dateOfBirth,
      });
      Alert.alert(
        "Sėkmės pranešimas",
        "Naudotojo informacija sėkmingai išsaugota"
      );
      navigation.navigate("Login");
      setUsername("");
      setName("");
      setSurname("");
      setDateOfBirth("");
      setError("");
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("Klaida išsaugant naudotojo informacija");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Įveskite savo informaciją</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <EntryInputField
              headerText="Slapyvardis"
              placeholderText="Įveskite savo slapyvardį"
              isPassword={false}
              margin={[0, 20, 0, 0]}
              onChangeText={(text) => setUsername(text)}
            />
            <EntryInputField
              headerText="Vardas"
              placeholderText="Įveskite savo vardą"
              isPassword={false}
              margin={[0, 20, 0, 0]}
              onChangeText={(text) => setName(text)}
            />
            <EntryInputField
              headerText="Pavardė"
              placeholderText="Įveskite savo pavardę"
              isPassword={false}
              margin={[0, 20, 0, 0]}
              onChangeText={(text) => setSurname(text)}
            />
            <EntryInputField
              headerText="Gimimo data"
              placeholderText="YYYY-MM-DD"
              isPassword={false}
              keyboardType="numeric"
              margin={[0, 20, 0, 0]}
              onChangeText={(text) => setDateOfBirth(text)}
            />
            <EntryButton
              text="Pateikti"
              textColor={Colors.White}
              buttonColor={Colors.Blue}
              margin={[30, 75, 0, 0]}
              onPress={handleInfo}
              style={{ elevation: 5 }}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  formContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  label: {
    marginBottom: 30,
    color: Colors.LightBlue,
    fontSize: 26,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
