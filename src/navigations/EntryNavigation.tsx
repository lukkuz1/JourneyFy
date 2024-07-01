import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Entry/Login';
import Register from '../screens/Entry/Register';
import ForgotPassword from '../screens/Entry/ForgotPassword';
import MainInfo from '../screens/Entry/MainInfo';

const Stack = createStackNavigator();

export default function EntryNavigation() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        presentation: 'modal',
      }}
      initialRouteName='Login'
    >
      <Stack.Screen name="Login" component={Login } />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="MainInfo" component={MainInfo} />
    </Stack.Navigator>
  );
};