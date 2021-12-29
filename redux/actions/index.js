import { USER_STATE_CHANGE} from '../constants/index'
import firebase from "firebase";

export function fetchUser(){
    return((dispatch) => {
        firebase.frestore()
            .collection("user")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if(snapshot.exist){
                    console.log(snapshot.data())
                    dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
                }
                else{
                    console.log('Nie istnieje')
                }
            })
    })
}