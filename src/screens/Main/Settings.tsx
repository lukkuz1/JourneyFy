import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import { getAuth, deleteUser } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import firebaseServices from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";
import Colors from "../../constants/Colors";
import { logout_icon_xml } from "../../assets/xml/svg";
import { password_icon_xml } from "../../assets/xml/svg";
import { delete_icon_xml } from "../../assets/xml/svg";
import { profile_icon_xml } from "../../assets/xml/svg";
import EntryInputField from "../../components/Entry/EntryInputField";

const { db } = firebaseServices;

export default function Settings() {
  const navigation = useNavigation();
  const auth = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [populateusername, setpopulateUsername] = useState("");
  const [populatename, setpopulateName] = useState("");
  const [populatesurname, setpopulateSurname] = useState("");
  const [populateage, setpopulateAge] = useState("");
  const currentUserId = getAuth().currentUser.uid;


  const fetchUser = async () => {
    try {
      const userDoc = await getDoc(doc(db, "users", currentUserId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setpopulateUsername(data.username);
        setpopulateName(data.name);
        setpopulateSurname(data.surname);
        setpopulateAge(data.age.toString());
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [currentUserId]);

  const handleProfileUpdate = async () => {
    try {
      await updateDoc(doc(db, "users", currentUserId), {
        username,
        name,
        surname,
        age: parseInt(age),
      });
      fetchUser();
      Alert.alert("Sėkmės pranešimas", "Profilis sėkmingai atnaujintas");
      setProfileModalVisible(false);
    } catch (error) {
      console.error("Error updating profile: ", error);
      Alert.alert("Klaida", "Profilio atnaujinimas nepavyko");
    }
  };

  const handleLogoutPress = () => {
    auth.signOut();
  };

  const handlePasswordChange = () => {
    setPasswordModalVisible(true);
  };

  const handlePasswordSubmit = () => {
    if (newPassword !== confirmPassword) {
      alert("Slaptažodžiai nesutampa");
      return;
    }
    if (newPassword === "" || newPassword.length < 6) {
      alert("Slaptažodis privalo būti bent 6 simbolių");
      return;
    }
    auth.updatePassword(newPassword);
    setPasswordModalVisible(false);
    alert("Slaptažodis sėkmingai pakeistas");
  };

  const handleDeleteAccount = () => {
    const user = getAuth().currentUser;
    deleteUser(user)
      .then(() => {
        navigation.navigate("Login");
        Alert.alert("Paskyra ištrinta", "Paskyra sėkmingai ištrinta.");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleProfile = () => {
    setProfileModalVisible(true);
  };

  const handleChangeEmail = () => {
    if (!newEmail) {
      Alert.alert("Error", "Prašome įvesti el. paštą ir slaptažodį.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newEmail)) {
      Alert.alert("Error", "Įvestas el. pašto adresas yra neteisingas.");
      return;
    }
    auth.updateEmail(newEmail);
    setEmailModalVisible(false);
    alert("El. paštas pakeistas");
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View style={styles.container}>
        <Pressable onPress={handlePasswordChange} style={styles.DefaultButton}>
          <SvgXml xml={password_icon_xml} width={24} height={24} />
          <Text style={styles.defaultText}>Pakeisti slaptažodį</Text>
        </Pressable>

        <Pressable onPress={handleProfile} style={styles.DefaultButton}>
          <SvgXml xml={profile_icon_xml} width={24} height={24} />
          <Text style={styles.defaultText}>Profilis</Text>
        </Pressable>

        <Pressable onPress={handleLogoutPress} style={styles.DefaultButton}>
          <SvgXml xml={logout_icon_xml} width={24} height={24} />
          <Text style={styles.logoutButtonText}>Atsijungti</Text>
        </Pressable>

        <Pressable
          onPress={() => setIsModalVisible(true)}
          style={styles.DefaultButton}
        >
          <SvgXml xml={delete_icon_xml} width={24} height={24} />
          <Text style={styles.logoutButtonText}>Ištrinti paskyrą</Text>
        </Pressable>

        <Modal
          animationType="slide"
          transparent={true}
          visible={emailModalVisible}
          onRequestClose={() => setEmailModalVisible(!emailModalVisible)}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>El. pašto pakeitimas</Text>

                <EntryInputField
                  headerText="Naujas el. paštas"
                  placeholderText="Įveskite naują el. paštą"
                  keyboardType="email-address"
                  isPassword={false}
                  margin={[0, 20, 0, 0]}
                  onChangeText={(text) => setNewEmail(text)}
                />
                <View style={styles.buttonContainer}>
                  <Button title="Pakeisti" onPress={handleChangeEmail} />
                  <Button
                    title="Atšaukti"
                    onPress={() => setEmailModalVisible(false)}
                    color="red"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>

        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Ar tikrai norite ištrinti paskyrą?
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.confirmButton]}
                    onPress={() => {
                      handleDeleteAccount();
                      setIsModalVisible(false);
                    }}
                  >
                    <Text style={styles.buttonText}>Taip</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => setIsModalVisible(false)}
                  >
                    <Text style={styles.buttonText}>Ne</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={passwordModalVisible}
          onRequestClose={() => {
            setPasswordModalVisible(!passwordModalVisible);
          }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Slaptažodžio pakeitimas</Text>

                <EntryInputField
                  headerText="Naujas slaptažodis"
                  placeholderText="Įveskite savo naują slaptažodį"
                  isPassword={true}
                  margin={[0, 20, 0, 0]}
                  onChangeText={(text) => setNewPassword(text)}
                />

                <EntryInputField
                  headerText="Patvirtinkite slaptažodį"
                  placeholderText="Patvirtinkite savo naują slaptažodį"
                  isPassword={true}
                  margin={[0, 20, 0, 0]}
                  onChangeText={(text) => setConfirmPassword(text)}
                />
                <View style={styles.buttonContainer}>
                  <Button title="Pakeisti" onPress={handlePasswordSubmit} />
                  <Button
                    title="Atšaukti"
                    onPress={() => setPasswordModalVisible(false)}
                    color="red"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={profileModalVisible}
          onRequestClose={() => setProfileModalVisible(false)}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Atnaujinkite profilį</Text>
                <EntryInputField
                  headerText="Slapyvardis"
                  placeholderText={
                    populateusername || "Įveskite savo slapyvardį"
                  }
                  isPassword={false}
                  onChangeText={(text) => setUsername(text)}
                  margin={[0, 20, 0, 0]}
                />
                <EntryInputField
                  headerText="Vardas"
                  placeholderText={populatename || "Įveskite savo vardą"}
                  isPassword={false}
                  onChangeText={setName}
                  margin={[0, 20, 0, 0]}
                />
                <EntryInputField
                  headerText="Pavardė"
                  placeholderText={populatesurname || "Įveskite savo pavardę"}
                  isPassword={false}
                  onChangeText={setSurname}
                  margin={[0, 20, 0, 0]}
                />
                <EntryInputField
                  headerText="Amžius"
                  placeholderText={populateage || "Įveskite savo amžių"}
                  isPassword={false}
                  onChangeText={setAge}
                  keyboardType="numeric"
                  margin={[0, 20, 0, 0]}
                />
                <View style={styles.buttonContainer}>
                  <Button title="Išsaugoti" onPress={handleProfileUpdate} />
                  <Button
                    title="Atšaukti"
                    onPress={() => setProfileModalVisible(false)}
                    color="red"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  DefaultButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  logoutButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  defaultText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.LightBlue,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 600,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: "red",
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  modalContainer: {
    width: 800,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});
