import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from '../navigations/MainNavigation';
import EntryNavigation from '../navigations/EntryNavigation';
import { useAuth } from '../hooks/useAuth';
import { useUser } from '../hooks/useUser';
import firebase from '../services/firebase';


const Stack = createStackNavigator();

export default function AppNavigation() {

  const auth = useAuth();
  const user = useUser();


  return (
    <NavigationContainer>
      {auth.loggedIn && user.initialized && firebase.auth.currentUser.emailVerified ? (
        <MainNavigation/>
      ) : (
        <EntryNavigation />
      )}
    </NavigationContainer>
  );
}