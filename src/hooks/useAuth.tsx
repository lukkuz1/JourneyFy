import React, { createContext, useContext, useState, useEffect } from "react"
import { Alert } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, updatePassword as updPassword, updateEmail as updEmail, sendEmailVerification } from "firebase/auth";
import firebase from '../services/firebase';
import { useUser } from "./useUser";

type Props = {
  children?: React.ReactNode;
}

type UserData = {
  email: string;
  uid: string;
}

type AuthContextData = {
  loggedIn: boolean;
  user: object | null;
  signUp(email: string, password: string): Promise<UserCredential> | string;
  signIn(email: string, password: string): Promise<UserCredential> | string;
  signOut(): Promise<void>;
  updatePassword(newPassword: string): Promise<any>;
  updateEmail(newEmail: string): Promise<any>;
}

const authContext = createContext({} as AuthContextData);

export const useAuth = () => {
  return useContext(authContext);
}

export const AuthProvider: React.FC = ({ children }: Props) => {
  const [user, setUser] = useState<UserData | null>(null);
  const userData = useUser();

  useEffect(() => {
    if (user == null && userData.initialized == true) {
      userData.destroy();
    }
  }, [user]);


  const signIn = async (email: string, password: string): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(firebase.auth, email, password).then((userCredential) => {
      setUser(userCredential.user);
      userData.initialize(userCredential.user)
    }).catch((error) => {
      console.log(`useAuth signIn ERROR:\n    CODE: ${error.code}\n    MESSAGE: ${error.message}`)
      Alert.alert("Klaida", `${error.message}`)

      if (error.code == "auth/invalid-email")
        return "Invalid email!"

      return error.code;
    }).finally(() => { console.log("useAuth: User signIn successful") });
  }

  const signUp = async (email: string, password: string): Promise<UserCredential | string> => {
    console.log("useAuth: signUp called");
    try {
      const userCredential = await createUserWithEmailAndPassword(firebase.auth, email, password);
      const user = userCredential.user;
      setUser(user);
      sendEmailVerification(user);
      console.log("useAuth: User signUp successful", user);
      return userCredential;
    } catch (error) {
      console.log(`useAuth signUp ERROR:\n    CODE: ${error.code}\n    MESSAGE: ${error.message}`);
      Alert.alert("Klaida", `${error.message}`)
      if (error.code === "auth/invalid-email") {
        return "Invalid email!";
      }
      return error.code;
    }
  };

  const signOut = async (): Promise<void> => {
    await firebase.auth.signOut()
      .catch((error) => {
        console.log(`useAuth signOut ERROR:\n    CODE: ${error.code}\n    MESSAGE: ${error.message}`)
        Alert.alert("Klaida", `${error.message}`)
      });
    setUser(null);
  }

  const updatePassword = async (newPassword: string): Promise<void> => {
    return await updPassword(firebase.auth.currentUser, newPassword)
      .catch((error) => {
        console.log(error);
        Alert.alert("Klaida", `${error.message}`)
        return error.code;
      });
  }

  const updateEmail = async (newEmail: string): Promise<void> => {
    return await updEmail(firebase.auth.currentUser, newEmail)
      .catch((error) => {
        console.log(error);
        return error.code;
      });
  }

  return (
    <authContext.Provider value={{ loggedIn: !!user, user: user, signUp, signIn, signOut, updatePassword, updateEmail }}>
      {children}
    </authContext.Provider >
  );
}