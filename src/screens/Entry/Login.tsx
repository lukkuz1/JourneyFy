import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
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
  const auth = useAuth();

  const navigation = useNavigation();

  const handleLogin = async () => {
    const status = await auth.signIn(email, password);
    if (status != undefined) {
      setError("");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/journeyfy_logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Prisijungimas</Text>
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

        <View style={styles.linksContainer}>
          <Pressable
            onPress={() => navigation.navigate("ForgotPassword")}
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>Pamiršote slaptažodį?</Text>
          </Pressable>
        </View>

        <EntryButton
          text="Prisijungti"
          textColor={Colors.White}
          buttonColor={Colors.Blue}
          margin={[30, 75, 0, 0]}
          onPress={handleLogin}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 30,
  },
  formContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "transparent", // no background color
    alignItems: "center",
  },
  label: {
    marginBottom: 20,
    color: Colors.LightBlue,
    fontSize: 26,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  linksContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  linkButton: {
    marginBottom: 10,
  },
  linkText: {
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
