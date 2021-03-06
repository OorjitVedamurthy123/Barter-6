import React, { Component } from 'react';
import {  View, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import db from '../config'
import firebase from 'firebase'

export default class SettingsScreen extends Component{
  constructor(){
    super();
    this.state={
      userName   : '',
      firstName : '',
      lastName  : '',
      address   : '',
      mobileNumber   : '',
      docId     : ''
    }
  }

  getUserDetails=()=>{
    var userName = firebase.auth().currentUser.email;
    db.collection('users').where('username','==',userName).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        var data = doc.data()
        this.setState({
          userName  : data.username,
          firstName : data.first_name,
          lastName  : data.last_name,
          address   : data.address,
          mobileNumber   : data.mobile_number,
          docId     : doc.id
        })
      });
    })
  }

  updateUserDetails=()=>{
    db.collection("users").doc(this.state.docId)
    .update({
      "first_name": this.state.firstName,
      "last_name" : this.state.lastName,
      "address"   : this.state.address,
      "mobile_number"   : this.state.mobileNumber,
    })

    Alert.alert("Profile Updated Successfully")

  }

  componentDidMount(){
    this.getUserDetails()
  }


  render(){
    return(
        <View style={styles.formContainer}>
            <TextInput
              style={styles.formTextInput}
              placeholder ={"First Name"}
              maxLength ={12}
              onChangeText={(text)=>{
                this.setState({
                  firstName: text
                })
              }}
              value ={this.state.firstName}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Last Name"}
              maxLength ={16}
              onChangeText={(text)=>{
                this.setState({
                  lastName: text
                })
              }}
                value ={this.state.lastName}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Mobile Number"}
              maxLength ={10}
              keyboardType={'numeric'}
              onChangeText={(text)=>{
                this.setState({
                  mobileNumber: text
                })
              }}
                value ={this.state.mobileNumber}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Address"}
              multiline = {true}
              onChangeText={(text)=>{
                this.setState({
                  address: text
                })
              }}
                value ={this.state.address}
            />
            <TouchableOpacity style={styles.button}
              onPress={()=>{
                this.updateUserDetails()
              }}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
  }
}


const styles = StyleSheet.create({
  container : {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer:{
    flex:1,
    width:'100%',
    alignItems: 'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
  },
  buttonText:{
    fontSize:25,
    fontWeight:"bold",
    color:"#fff"
  }
})