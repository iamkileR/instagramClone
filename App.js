import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import {View, Text } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'

const store = createStore(rootReducer, applyMiddleware(thunk))


const firebaseConfig = {
  apiKey: "AIzaSyC6tlaFtcgvyqozxbvFqgpVHsATxTUqJSk",
  authDomain: "insta-781fd.firebaseapp.com",
  projectId: "insta-781fd",
  storageBucket: "insta-781fd.appspot.com",
  messagingSenderId: "92309556321",
  appId: "1:92309556321:web:407248b6cac19d9fafee20",
  measurementId: "G-X1MBK0HS6R"
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
        })
      }else {
        this.setState({
        loggedIn: true,
        loaded: true,
      })
      }
    })
  
  }



  render() {
    const { loggedIn , loaded } = this.state;
    if(!loaded){
      return(
        <View style = {{ flex :1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }
    if (!loggedIn){
      return(
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return(
      <Provider store = {store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
           <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}}/>
           <Stack.Screen name="Add" component={AddScreen}/>

        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
      
    );


  }
}

export default App