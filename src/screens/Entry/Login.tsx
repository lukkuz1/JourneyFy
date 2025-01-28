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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import EntryInputField from "../../components/Entry/EntryInputField";
import EntryButton from "../../components/Entry/EntryButton";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const auth = useAuth();

  const navigation = useNavigation();

  const handleLogin = async () => {
    const status = await auth.signIn(email, password);
    if (status != undefined) {
      setError("Bad login");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/journeyfy_logo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.rectangle}>
          <Text style={styles.label}>Prisijungimas</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <EntryInputField
            headerText="El. paštas"
            placeholderText="Įveskite savo el. paštą"
            isPassword={false}
            margin={[0, 20, 0, 0]}
            onChangeText={(text) => setEmail(text)}
          />
          <EntryInputField
            headerText="Slaptažodis"
            placeholderText="Įveskite savo slaptažodį"
            isPassword={true}
            margin={[0, 20, 0, 0]}
            onChangeText={(text) => setPassword(text)}
          />
          <View style={styles.checkboxContainer}>
            <Pressable
              onPress={() => navigation.navigate("ForgotPassword")}
              style={styles.forgotPasswordButton}
            >
              <Text style={styles.forgotPasswordText}>
                Pamiršote slaptažodį?
              </Text>
            </Pressable>
          </View>

          <EntryButton
            text="Prisijungti"
            textColor={Colors.White}
            buttonColor={Colors.Blue}
            margin={[30, 75, 0, 0]}
            onPress={() => handleLogin()}
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
    backgroundColor: Colors.LightBlue,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  logoContainer: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  rectangle: {
    width: "100%",
    padding: 20,
    borderTopRightRadius: 50,
    backgroundColor: Colors.White,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 10,
    color: Colors.Black,
    fontSize: 14,
    fontWeight: "400",
  },
  rememberMeText: {
    color: Colors.Black,
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 10,
  },
  forgotPasswordButton: {
    marginLeft: "auto",
  },
  forgotPasswordText: {
    color: Colors.LightBlue,
    fontSize: 14,
    fontWeight: "600",
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
