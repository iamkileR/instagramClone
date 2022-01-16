import React, { Component } from 'react'
import {View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchUser, fetchUserPosts, fetchUserFollowing, clearData} from '../redux/actions/index'
import { createMaterialBottomTabNavigator  } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase'

import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
import SearchScreen from './main/Search'

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () =>{
    return(null)
}

export class MainScreen extends Component {
    
    componentDidMount(){
        this.props.clearData();
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
    }

    render() {
        
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Tab.Navigator initialRouteName='Feed' labeled={false} barStyle={{ backgroundColor: '#ffffff' }}>
                    <Tab.Screen name="Feed" component={FeedScreen} 
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="home" color={color} size={26}/>
                            )
                        }}/>
                    <Tab.Screen name="Search" component={SearchScreen} navigation={this.props.navigation}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="magnify" color={color} size={26}/>
                            )
                        }}/>
                    <Tab.Screen name="AddContainer" component={EmptyScreen} 
                        listeners={({ navigation }) => ({
                            tabPress: event =>{
                                event.preventDefault();
                                navigation.navigate("Add")
                            }
                        })}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
                            )
                        }}/>
                    <Tab.Screen name="Profile" component={ProfileScreen}
                        listeners={({ navigation }) => ({
                            tabPress: event =>{
                                event.preventDefault();
                                navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
                        }})}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                            )
                        }}/>
                </Tab.Navigator>
                <StatusBar style="dark"/>      
            </View>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts, fetchUserFollowing, clearData}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(MainScreen);
