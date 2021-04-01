import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity,Image } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'


export default class BookDonateScreen extends Component{
  constructor(){
    super()
    this.state = {
      allRequests : []
    }
  this.requestRef= null
  }

   getRequestedExchangeItems=()=>{
    this.requestRef = db.collection("exchange_requests")
    .onSnapshot((snapshot)=>{
      var allRequests = snapshot.docs.map((doc) => doc.data())
      this.setState({
        allRequests : allRequests
      });
    })
  }

  

  componentWillUnmount(){
    this.requestRef = null;
  }

  renderItem = ( {item, index} ) =>{
    console.log(item.item_name, index)
    return (
      <ListItem key={index} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.item_name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
          
        </ListItem.Content>
        <TouchableOpacity style={{backgroundColor:"red", padding:7}}>
          <Text>Exchange</Text>
        </TouchableOpacity>
      </ListItem>
    );
  };
  componentDidMount(){
    this.getRequestedExchangeItems()
  }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={{flex:1}}>
          {
            this.state.allRequests.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Exchange Items</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={(item, index)=> index.toString()}
                data={this.state.allRequests}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
