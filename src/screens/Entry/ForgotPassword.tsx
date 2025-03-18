import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/styles";
import EntryInputField from "../../components/Entry/EntryInputField";
import EntryButton from "../../components/Entry/EntryButton";
import { sendPasswordResetEmail } from "firebase/auth";
import firebase from "../../services/firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleForgotPassword = async () => {
    try {
      if (!email.trim()) {
        Alert.alert(
          "Neteisingas el. paštas",
          "Prašome įvesti teisingą el. paštą."
        );
        return;
      }
      await sendPasswordResetEmail(firebase.auth, email);
      Alert.alert(
        "Slaptažodžio priminimo nuoroda nusiųsta",
        "Jeigu turite paskyrą, slaptažodžio priminimo nuoroda išsiųsta į el. paštą"
      );
      navigation.navigate("Login");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        Alert.alert("Invalid Email", "Please enter a valid email address.");
      } else if (error.code === "auth/user-not-found") {
        Alert.alert(
          "Email Not Found",
          "This email address is not associated with any account."
        );
      } else {
        Alert.alert("Password Reset Failed", error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.header}>
                            <Text style={styles.headerText}>JourneyFy</Text>
                          </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/journeyfy_logo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Slaptažodžio priminimas</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <EntryInputField
            headerText="Įveskite savo paskyros el. paštą"
            placeholderText="pavyzdys@gmail.com"
            isPassword={false}
            margin={[0, 20, 0, 0]}
            onChangeText={(text) => setEmail(text)}
          />
          <EntryButton
            text="Priminti slaptažodį"
          textColor={Colors.whiteColor}
          buttonColor={Colors.primaryColor}
            margin={[30, 75, 0, 0]}
            onPress={() => handleForgotPassword()}
            style={{ elevation: 5 }}
          />
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Neturite paskyros?</Text>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text style={styles.signUpLink}>Pradėkite jau šiandien!</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
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
  header: {
    backgroundColor: "transparent",
    padding: 10,
  },
  headerText: {
    color: Colors.primaryColor,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 40,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  formContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "transparent", // No background color to match Login page
    alignItems: "center",
  },
  label: {
    marginBottom: 20,
    color: Colors.LightBlue, // Label color from Login page
    fontSize: 26,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    color: Colors.Gray,
    fontSize: 14,
    fontWeight: "400",
  },
  signUpLink: {
    color: Colors.LightBlue,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
});
