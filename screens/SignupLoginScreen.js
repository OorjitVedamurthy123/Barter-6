import React,{Component} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
 

export default class SignupLoginScreen extends Component{
  constructor(){
    super();
    this.state={

      password:'',
      firstName:'',
      lastName:'',
      mobileNumber:'',
      userName:'',
      address:'',
      isVisible:false,
      confirmPassword:''
    }
  }

  userSignUp=(username, password, confirmPassword)=>{
    if(password !== confirmPassword){
      return Alert.alert("Password doesn't match, Check your password")
    }else{
    firebase.auth().createUserWithEmailAndPassword(username,password)
    .then((response)=>{
      db.collection("users").add({
        first_name:this.state.firstName,
        last_name:this.state.lastName,
        mobile_number:this.state.mobileNumber,
        username:this.state.userName,
        address:this.state.address
      })
      return Alert.alert("User Added successfully",
      '',
      [
        {text:'OK', onPress:()=>this.setState({isVisible:false})}
      ]
      )
    })
    .catch(function(error){
      var errorCode = error.code;
      var errormessage = error.message
      return Alert.alert(errormessage)
    })
  }}
  userLogin=(username, password)=>{
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then((response)=>{
      this.props.navigation.navigate("HomeScreen")
    })
    .catch(function(error){
      var errorCode = error.code;
      var errormessage = error.message
      return Alert.alert(errormessage)
    })
  }
  showModal=()=>{
    return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isVisible}
    >
      <View style = {{flex:1, backgroundColor : '#ffffff', justifyContent : 'center'}}>
        <View>
          <Text style={styles.title2}>Registration Form</Text>
      <TextInput
        style={styles.formTextInput}
        placeholder={"First Name"}
        maxLength={12}
        onChangeText={(text)=>{
          this.setState({
            firstName:text
          })
        }}
        />
        <TextInput
        style={styles.formTextInput}
        placeholder={"Last Name"}
        maxLength={16}
        onChangeText={(text)=>{
          this.setState({
            lastName:text
          })
        }}
        />
        <TextInput
        style={styles.formTextInput}
        placeholder={"Email Id"}
        keyboardType="email-address"
        onChangeText={(text)=>{
          this.setState({
            userName:text
          })
        }}
        />
        <TextInput
        style={styles.formTextInput}
        placeholder={"Address"}
        onChangeText={(text)=>{
          this.setState({
            address:text
          })
        }}
        />
        <TextInput
        style={styles.formTextInput}
        placeholder={"Mobile Number"}
        keyboardType={'numeric'}
        maxLength={10}
        onChangeText={(text)=>{
          this.setState({
            mobileNumber:text
          })
        }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Confirm Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              confirmPassword: text
            })
          }}
        />

        </View>
        <View>
        <TouchableOpacity style={styles.registerButton}
          onPress={()=>{
            this.userSignUp(this.state.userName, this.state.password, this.state.confirmPassword)
          }}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={styles.cancelButton}
            onPress = {()=>{
              this.setState({
                isVisible:false
              })
            }}
        >
          <Text style={styles.registerButtonText}>Cancel</Text>
        </TouchableOpacity>
        </View>
        </View>
    </Modal>
    )
  }
  render(){
    return(
      <View style={styles.container}>
        <View>
         
        </View>
        {this.showModal()}
        <View>
          <Text style={styles.title}>Barter App</Text>
        </View>
        <View>
          <TextInput
          style={styles.loginBox}
          placeholder= "Email Id"
          keyboardType="email-address"
          onChangeText={(text)=>{
            this.setState({
              userName:text
            })
          }}
          />
          <TextInput
          style={styles.loginBox}
          secureTextEntry={true}
          placeholder="Enter Password"
          onChangeText={(text)=>{
            this.setState({
              password:text
            })
          }}
          />
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress={()=>{
              this.userLogin(this.state.userName, this.state.password)
            }}
          >
          <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button]}
            onPress={()=>{this.setState({
                isVisible:true
            })}}
          >
          <Text style={styles.buttonText}>SignUp</Text>
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
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
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
    marginTop:20,
    padding:10
  },
  registerButton:{
    width:100,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:80,
    marginLeft:50
  },
  registerButtonText:{
    color:'#ff5722',
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