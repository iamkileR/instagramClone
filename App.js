import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import firebase from 'firebase';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import {View, Text } from 'react-native';


const firebaseConfig = {
  apiKey: "AIzaSyBYb0ZpakjwyECsvha8hCg_QRnpAJ5t_ic",
  authDomain: "myinstagram-a58c0.firebaseapp.com",
  projectId: "myinstagram-a58c0",
  storageBucket: "myinstagram-a58c0.appspot.com",
  messagingSenderId: "921363982394",
  appId: "1:921363982394:web:72fd7b308058e42630ed03",
  measurementId: "G-NVZEM76FKK"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();


export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        }
        )
      }else {
        this.setState({
        loggedIn: true,
        loaded: true,
      })
      }
    })
  
  }



  render() {
    const {loggedIn , loaded} = this.state;
    if(!loaded){
      return(
        <View style = {{ flex :1, justifyContent: 'center'}}>
          <Text>
            Loading
          </Text>

        </View>
      )
    }
    if (!loggedIn){
      return(
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return(
      <View style = {{ flex :1, justifyContent: 'center'}}>
      <Text>
        User is logged in
      </Text>

    </View>
    );


  }
}

export default App