import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/styles";
import EntryInputField from "../../components/Entry/EntryInputField";
import EntryButton from "../../components/Entry/EntryButton";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const auth = useAuth();

  const handleSignUp = async () => {
    const status = await auth.signUp(email, password);
    if (typeof status === "string") {
      console.log("Error Code: ", status);
      setError(status);
    } else if (status) {
      Alert.alert(
        "Verifikacijos nuoroda išsiųsta",
        "Patvirtinkite savo el. paštą, kad galėtumėte prisijungti prie programėlės."
      );
      navigation.navigate("Login");
    } else {
      console.log("Unexpected status: ", status);
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
            source={require("../../assets/images/auth.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Registracija</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <EntryInputField
            headerText="El. paštas"
            placeholderText="Įveskite savo el. paštą"
            isPassword={false}
            margin={[0, 20, 0, 0]}
            keyboardType="default"
            onChangeText={(text) => setEmail(text)}
          />
          <EntryInputField
            headerText="Slaptažodis"
            placeholderText="Įveskite savo slaptažodį"
            isPassword={true}
            margin={[0, 20, 0, 0]}
            keyboardType="default"
            onChangeText={(text) => setPassword(text)}
          />
          <EntryButton
            text="Registruotis"
          textColor={Colors.whiteColor}
          buttonColor={Colors.primaryColor}
            margin={[30, 75, 0, 0]}
            onPress={() => handleSignUp()}
            style={{ elevation: 5 }}
          />
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Jau turite paskyrą?</Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signInLink}>Prisijungti!</Text>
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
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  formContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "transparent", // Same as Login page: no background color
    alignItems: "center",
  },
  label: {
    marginBottom: 20,
    color: Colors.LightBlue, // Color from Login page
    fontSize: 26,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  signInContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  signInText: {
    color: Colors.Gray,
    fontSize: 14,
    fontWeight: "400",
  },
  signInLink: {
    color: Colors.LightBlue,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
});