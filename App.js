import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import SignupLoginScreen from './screens/SignupLoginScreen'
import {AppTabNavigator} from './components/AppTabNavigator'
import {createDrawerNavigator} from 'react-navigation-drawer'
import { AppDrawerNavigator } from './components/AppDrawerNavigator'
import {CustomSideBarMenu}  from './components/CustomSideBarMenu';

export default class App extends Component {
  render(){
  return (
      <AppContainer/>
  );
  }
}

const switchNavigator = createSwitchNavigator({
  SignupLoginScreen : {screen : SignupLoginScreen},
  Drawer : {screen : AppDrawerNavigator},
  BottomTab : {screen : AppTabNavigator}
});

const AppContainer = createAppContainer(switchNavigator)