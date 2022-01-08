import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import firebase from 'firebase';


export class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }
        this.onSignUp = this.onSignUp.bind(this)
    }

    
    onSignUp(){
        const { email, password, name} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((result) => {
            firebase.firestore().collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                    name,
                    email
                })
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }



    render() {
        return (
            <View>
                <ImageBackground style={ styles.logo } 
                    //resizeMode='cover' 
                    source={require('./image/login.png')}>
                </ImageBackground>
                <View style={{paddingTop: 30}}>
                    <TextInput
                            style={styles.input}
                            placeholder = "Name..."
                            onChangeText={(name) => this.setState( {name} )}
                            
                        /> 
                        <TextInput
                            style={styles.input}
                            placeholder = "E-mail..."
                            onChangeText={(email) => this.setState( {email} )}
                        
                        />
                        <TextInput
                            style={styles.input}
                            placeholder = "Password..."
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState( {password} )}
                            
                        />
                </View>
                <View style = {styles.viewButton}>
                    <TouchableOpacity 
                        style = {styles.touchButton}
                        onPress= {() => this.onSignUp()}>
                        <Text style={styles.buttonText}> Sign Up </Text>
                    </TouchableOpacity>
                </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        marginTop: "20%",
        width: "100%",
        height: 80,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    touchButton: {
        backgroundColor: "#8b008b",
        padding: 10,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 2
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
    },
    viewButton:{
        paddingRight: 20,
        paddingLeft: 20,
    },
});

export default Register
