import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import EntryInputField from '../../components/Entry/EntryInputField';
import EntryButton from '../../components/Entry/EntryButton';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleForgotPassword = async () => {
    // Forgot password logic
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/journeyfy_logo.png')} style={styles.logo} />
        </View>
        <View style={styles.rectangle}>
          <Text style={styles.label}>Slaptažodžio priminimas</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <EntryInputField
            headerText="Įveskite savo paskyros el. paštą"
            placeholderText="vardenispavardenis@gmail.com"
            isPassword={false}
            margin={[0, 20, 0, 0]}
            onChangeText={(text) => setEmail(text)}
          />
          <EntryButton
            text="Priminti slaptažodį"
            textColor={Colors.White}
            buttonColor={Colors.Blue}
            margin={[30, 75, 0, 0]}
            onPress={() => handleForgotPassword()}
            style={{ elevation: 5 }}
          />
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Neturite paskyros?</Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40, // Adjust as needed to ensure bottom content is not obscured
  },
  logoContainer: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  rectangle: {
    width: '100%',
    padding: 20,
    borderTopRightRadius: 50,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  label: {
    marginBottom: 60,
    color: Colors.LightBlue,
    fontSize: 26,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: Colors.Gray,
    fontSize: 14,
    fontWeight: '400',
  },
  signUpLink: {
    color: Colors.LightBlue,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
});
