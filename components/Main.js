import React, { Component } from 'react'
import {View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

export class MainScreen extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render() {
        //const { currentUser} = this.props;

        return (
            <View style = {{ flex :1, justifyContent: 'center'}}>
                <Text>
                    is logged in
                </Text>
            </View>
        )
    }
}

//const mapStateToProps = (store) => ({
//    currentUser: store.userState.currentUser
//})

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);

export default connect(null, mapDispatchProps)(MainScreen);
