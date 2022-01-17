import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import firebase from 'firebase'
import * as Updates from 'expo-updates';
import { connect } from 'react-redux'

import ProfileSc from './Profile'

const Drawer = createDrawerNavigator();

function logout() {
    firebase.auth().signOut();
    Updates.reloadAsync()
}

function Export() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Profile" component={ProfileSc} initialParams={{ uid: firebase.auth().currentUser.uid }} />
            <Drawer.Screen name="Logout" component={logout} />
        </Drawer.Navigator>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})

export default connect(mapStateToProps, null)(Export)



