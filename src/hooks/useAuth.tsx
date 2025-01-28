import React, { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  updatePassword as updPassword,
  updateEmail as updEmail,
  sendEmailVerification,
} from "firebase/auth";
import firebase from "../services/firebase";
import { useUser } from "./useUser";

type Props = {
  children?: React.ReactNode;
};

type UserData = {
  email: string;
  uid: string;
};

type AuthContextData = {
  currentUser(currentUser: any, newPassword: string): Promise<void>;
  loggedIn: boolean;
  user: object | null;
  signUp(email: string, password: string): Promise<UserCredential>;
  signIn(email: string, password: string): Promise<UserCredential>;
  signOut(): Promise<void>;
  updatePassword(newPassword: string): Promise<any>;
  updateEmail(newEmail: string): Promise<any>;
};

const authContext = createContext({} as AuthContextData);

export const useAuth = () => {
  return useContext(authContext);
};

export const AuthProvider: React.FC = ({ children }: Props) => {
  const [user, setUser] = useState<UserData | null>(null);
  const userData = useUser();

  useEffect(() => {
    if (user == null && userData.initialized === true) {
      userData.destroy();
    }
  }, [user]);

  const currentUser = async (
    currentUser: any,
    newPassword: string
  ): Promise<void> => {
    try {
      await updatePassword(newPassword);
    } catch (error) {
      console.error("Error updating password:", error);
      Alert.alert("Klaida", `${error.message}`);
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );
      setUser(userCredential.user);
      userData.initialize(userCredential.user);
      return userCredential;
    } catch (error: any) {
      console.log(
        `useAuth signIn ERROR:\n    CODE: ${error.code}\n    MESSAGE: ${error.message}`
      );
      Alert.alert("Klaida", `${error.message}`);
      if (error.code === "auth/invalid-email")
        return Promise.reject("Invalid email!");
      return Promise.reject(error.code);
    }
  };

  const signUp = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      sendEmailVerification(user);
      return userCredential;
    } catch (error: any) {
      console.log(
        `useAuth signUp ERROR:\n    CODE: ${error.code}\n    MESSAGE: ${error.message}`
      );
      Alert.alert("Klaida", `${error.message}`);
      if (error.code === "auth/invalid-email")
        return Promise.reject("Invalid email!");
      return Promise.reject(error.code);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await firebase.auth.signOut();
      setUser(null);
    } catch (error: any) {
      console.log(
        `useAuth signOut ERROR:\n    CODE: ${error.code}\n    MESSAGE: ${error.message}`
      );
      Alert.alert("Klaida", `${error.message}`);
    }
  };

  const updatePassword = async (newPassword: string): Promise<any> => {
    try {
      if (firebase.auth.currentUser) {
        await updPassword(firebase.auth.currentUser, newPassword);
      }
    } catch (error: any) {
      Alert.alert("Klaida", `${error.message}`);
      return error.code;
    }
  };

  const updateEmail = async (newEmail: string): Promise<any> => {
    try {
      if (firebase.auth.currentUser) {
        await updEmail(firebase.auth.currentUser, newEmail);
      }
    } catch (error: any) {
      return error.code;
    }
  };

  return (
    <authContext.Provider
      value={{
        loggedIn: !!user,
        user: user,
        currentUser,
        signUp,
        signIn,
        signOut,
        updatePassword,
        updateEmail,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
