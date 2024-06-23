import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from '../navigations/MainNavigation';
import EntryNavigation from '../navigations/EntryNavigation';

const Stack = createStackNavigator();

export default function AppNavigation() {

  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <NavigationContainer>
      {loggedIn ? (
        <MainNavigation/>
      ) : (
        <EntryNavigation />
      )}
    </NavigationContainer>
  );
}