import React from 'react';
import {View,Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/login_screens/LoginScreen';
import EnterOTPScreen from './src/login_screens/EnterOTPScreen';

/*
  # This is basically the navigation component.
  # Have used native stack navigator.
  # Custom animation have also been used.
*/

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="EnterOTPScreen" component={EnterOTPScreen} />
    </Stack.Navigator>
  </NavigationContainer>  
  )
};

export default App;