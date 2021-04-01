import React,{Component} from 'react'
import {View, Text, StyleSheet, Alert} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import db from '../config';
import firebase from 'firebase';

export default class ExchangeScreen extends Component{
    constructor(){
        super()
        this.state={
            userName:firebase.auth().currentUser.email,
            itemName:'',
            description:''
        }
    };

    additem=(itemName, description)=>{
        
        db.collection("exchange_requests").add({
            "username" : this.state.userName,
            "item_name" : this.state.itemName,
            "description" : this.state.description
        })

        this.setState({
          itemName:'',
          description:''
      })  

        return Alert.alert(
            'Item ready to exchange',
            '',
            [
                {text : 'OK', onPress:()=>{
                    this.props.navigation.navigate('HomeScreen')
                }}
            ]
        );
    }
    render(){
        return(
            <View>
                <Text style={styles.title}>Add Item</Text>
                <View>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder = "Item Name"
                        onChangeText={(text)=>{
                            this.setState({
                                itemName:text
                            })
                        }}
                        value={this.state.itemName}
                    >

                    </TextInput>
                    <TextInput
                        style={styles.formTextInput2}
                        placeholder = "Description"
                        onChangeText={(text)=>{
                            this.setState({
                                description:text
                            })
                        }}
                        value={this.state.description}
                    >

                    </TextInput>
                    <TouchableOpacity style={styles.registerButton}
                        onPress={()=>{
                            this.additem(this.state.itemName, this.state.description)
                        }}
                    >
                        <Text style={styles.registerButtonText}>Add Item</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'cyan',
      alignItems: 'center',
      justifyContent: 'center'
    },
    profileContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    title :{
      fontSize:45,
      marginTop:20,
      fontWeight:'300',
      paddingBottom:10,
      paddingTop:-10,
      backgroundColor:"lightblue",
      color : 'orange',
      textAlign:"center"
    },
    title2:{
      fontSize:45,
      fontWeight:'300',
      paddingBottom:30,
      color : 'orange',
      textAlign:"center"
    },
    loginBox:{
      width: 300,
      height: 40,
      borderBottomWidth: 1.5,
      borderColor : 'yellow',
      fontSize: 20,
      margin:10,
      paddingLeft:10
    },
    KeyboardAvoidingView:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    modalTitle :{
      justifyContent:'center',
      alignSelf:'center',
      fontSize:30,
      color:'#ff5722',
      margin:50
    },
    modalContainer:{
      flex:1,
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ffff",
      marginRight:30,
      marginLeft : 30,
      marginTop:80,
      marginBottom:80,
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:170,
      padding:10
    },
    formTextInput2:{
        width:"75%",
        height:75,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:25,
        padding:10
      },
    registerButton:{
      width:275,
      height:40,
      alignItems:'center',
      justifyContent:'center',
      borderWidth:1,
      borderRadius:10,
      marginTop:40,
      marginLeft:44,
      backgroundColor:"orange"
    },
    registerButtonText:{
      color:'white',
      fontSize:15,
      fontWeight:'bold'
    },
    cancelButton:{
      width:100,
      height:40,
      alignItems:'center',
      justifyContent:'center',
      borderWidth:1,
      borderRadius:10,
      marginTop:-40,
      marginLeft:200
    },
   
    button:{
      width:350,
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:25,
      backgroundColor:"lightgreen",
      shadowColor: "white",
      shadowOffset: {
         width: 0.3,
         height: 6.7,
      },
      shadowOpacity: 0.30,
      shadowRadius: 10.32,
      elevation: 16,
      padding: 10
    },
    buttonText:{
      color:'#ffff',
      fontWeight:'200',
      fontSize:20
    }
  })