import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as firebase from 'firebase';
import { initializeApp } from 'firebase/app';

import LandingScreen from './components/auth/Landing'
import Register from './components/auth/Register'

const firebaseConfig = {
  apiKey: "AIzaSyC7rkL21Zmcx3E8OmBRiYYgDrqs8OWJrlI",
  authDomain: "instaappclone-a89ba.firebaseapp.com",
  projectId: "instaappclone-a89ba",
  storageBucket: "instaappclone-a89ba.appspot.com",
  messagingSenderId: "849559175975",
  appId: "1:849559175975:web:545d174cfa52d00720df02",
  measurementId: "G-7SZTCHWF51"
};

if (firebase.apps.length === 0 ){
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>

        </Stack.Navigator>

    </NavigationContainer>
 
  );
}