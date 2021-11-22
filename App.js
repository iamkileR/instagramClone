import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase/compat/app';
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import {View, Text } from 'react-native';


const firebaseConfig = {
  apiKey: "AIzaSyC7rkL21Zmcx3E8OmBRiYYgDrqs8OWJrlI",
  authDomain: "instaappclone-a89ba.firebaseapp.com",
  projectId: "instaappclone-a89ba",
  storageBucket: "instaappclone-a89ba.appspot.com",
  messagingSenderId: "849559175975",
  appId: "1:849559175975:web:545d174cfa52d00720df02",
  measurementId: "G-7SZTCHWF51"
};

const app = firebase.initializeApp(firebaseConfig);
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