import React, { useState } from 'react'
import {View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import firebase from 'firebase';
require('firebase/firestore');

 
export default function Search(props){
    const [users, setUsers] = useState([])

    const fetchUsers = (search) => {
        firebase.firestore()
        .collection('users')
        .where('name', '>=', search)
        .get()
        .then((snapshot) => {
            let users = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return{ id, ...data }
            });
            setUsers(users);
        })
    }

    return(
        <View>
            <TextInput
                style={styles.input}
                placeholder='Search...'
                onChangeText={(search) => fetchUsers(search)}
            />
            <Text style={styles.headerText}> Instagram Users </Text>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Profile", {uid: item.id})}>
                        <Text style={styles.usersText}>{item.name}</Text>
                    </TouchableOpacity>
                    
                )}
             />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        justifyContent: "center"
    },
    usersText:{
        fontSize: 20,
        margin: 10
    },
    headerText:{
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#8b008b"
    }
});