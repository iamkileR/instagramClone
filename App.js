import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import {View, ImageBackground } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'
import CommentScreen from './components/main/Comment'

const store = createStore(rootReducer, applyMiddleware(thunk))


const firebaseConfig = {
  apiKey: "AIzaSyA9JM9Brqag9HOvur165NFGRObdft2uEnY",
  authDomain: "instaappclone1.firebaseapp.com",
  projectId: "instaappclone1",
  storageBucket: "instaappclone1.appspot.com",
  messagingSenderId: "264166316568",
  appId: "1:264166316568:web:1feca7eaf427379f59c16d"
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
        <View style = {{ flex :1, justifyContent: 'center', alignItems:'center'}}>
          <ImageBackground style={{width: "100%", height: "100%"}} 
            //resizeMode='cover' 
            source={require('./logo.png')}>
          </ImageBackground>
        </View>
      )
    }
    if (!loggedIn){
      return(
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return(
      <Provider store = {store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
           <Stack.Screen name="Main" component={MainScreen}/>
           <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
           <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
           <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation}/>
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
      
    );


  }
}

export default App